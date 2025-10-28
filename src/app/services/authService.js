import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ApiError } from '../../utils/apiResponse.js';
import env from '../../config/env.js';

const generateToken = (id) => {
    return jwt.sign({ id }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRE });
};

export const register = async (userData) => {
    return {message: 'Function not implemented.'};
    const { email, password, name } = userData;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new ApiError(400, 'User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, env.BCRYPT_ROUNDS);

    const user = await User.create({
        email,
        password: hashedPassword,
        name,
    });

    const token = generateToken(user.id);

    return {
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        },
        token,
    };
};

export const login = async ({ email, password }) => {
    return {message: 'Function not implemented.'};
    const user = await User.findOne({
        where: { email },
        attributes: ['id', 'email', 'name', 'password', 'role', 'is_active']
    });

    if (!user) {
        throw new ApiError(401, 'Invalid credentials');
    }

    if (!user.is_active) {
        throw new ApiError(401, 'Account is inactive');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new ApiError(401, 'Invalid credentials');
    }

    // Update last login
    await user.update({ last_login: new Date() });

    const token = generateToken(user.id);

    return {
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        },
        token,
    };
};

export const refreshToken = async (oldToken) => {
    try {
        const decoded = jwt.verify(oldToken, env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);

        if (!user || !user.is_active) {
            throw new ApiError(401, 'Invalid token');
        }

        const newToken = generateToken(user.id);
        return { token: newToken };
    } catch (error) {
        throw new ApiError(401, 'Invalid or expired token');
    }
};