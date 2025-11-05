import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { PasswordReset, User } from '../models/index.js';
import { ApiError } from '../../utils/apiResponse.js';
import { sendMail, sendWelcomeEmail } from '../../mail.js';
import PasswordResetMail from '../mails/PasswordResetMail.js';
import { Op } from 'sequelize';

const generateTokens = (id) => {
    const accessToken = jwt.sign({ id },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE
        });
    const refreshToken = jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRE
    });
    return { accessToken, refreshToken };
};

export const register = async (userData) => {
    const { email, password, name } = userData;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new ApiError(400, 'User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        password: hashedPassword,
        name,
    });

    const { accessToken, refreshToken } = generateTokens(user.id);

    await user.update({ refresh_token: await bcrypt.hash(refreshToken, 10) });
    await sendWelcomeEmail(email, name);
    return {
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
        },
        accessToken,
        refreshToken,
    };
};

export const login = async ({ email, password }) => {
    const user = await User.findOne({
        where: { email },
        attributes: ['id', 'email', 'name', 'password']
    });

    if (!user) {
        throw new ApiError(401, 'Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new ApiError(401, 'Invalid credentials');
    }


    const { accessToken, refreshToken } = generateTokens(user.id);

    // Update last login, and refresh token
    await user.update({ last_login: new Date(), refresh_token: refreshToken });

    return {
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        },
        accessToken,
        refreshToken,
    };
};

export const forgotPassword = async (email) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    // generate a reset token and send email logic goes here
    const token = crypto.randomBytes(20).toString('hex');
    const resetTokenExpiry = Date.now() + (1000 * 60 * 5); // 5 minutes from now
    await PasswordReset.destroy({ where: { user_id: user.id } }); // Remove existing tokens
    await PasswordReset.create({
        user_id: user.id,
        token: await bcrypt.hash(token, 10),
        expires_in: resetTokenExpiry,
    });

    // send email with the token
    const link = `${process.env.FRONTEND_URL}/password-reset?token=${token}&email=${encodeURIComponent(email)}`;
    const mailable = PasswordResetMail(user.name, link);
    await sendMail(user.email, 'Password Reset Link', mailable);

    return { link };
};

export const resetPassword = async ({ token, email, password }) => {

    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new ApiError(404, 'User not founddd', user);
    }

    const passwordResetRecord = await PasswordReset.findOne({
        where: {
            expires_in: { [Op.gt]: new Date() },
            user_id: user.id
        }
    });

    if (!passwordResetRecord) {
        throw new ApiError(400, 'Invalid or expired password reset token');
    }
    let a = await bcrypt.compare(token, passwordResetRecord.token);
    console.log('Comparing tokens:', token, passwordResetRecord.token, a);
    if (!(bcrypt.compare(token, passwordResetRecord.token))) {
        throw new ApiError(400, 'Invalid or expired password reset token');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await user.update({ password: hashedPassword });
    await passwordResetRecord.destroy();

    return { message: 'Password reset successful' };
};

export const refreshToken = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const user = await User.findOne({ where: { id: decoded.id, refresh_token: token } });

        if (!user || !user.is_active) {
            throw new ApiError(401, 'Invalid token');
        }

        const { accessToken, refreshToken } = generateTokens(user.id);

        await user.update({ refresh_token: refreshToken });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(401, 'Invalid or expired token');
    }
};
