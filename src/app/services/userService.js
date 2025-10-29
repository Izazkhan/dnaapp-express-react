import { User } from '../models/index.js';
import { ApiError } from '../../utils/apiResponse.js';
import { Op } from 'sequelize';

export const getAllUsers = async (query) => {
    const { page = 1, limit = 10, search, role } = query;
    const offset = (page - 1) * limit;

    const where = {};

    if (search) {
        where[Op.or] = [
            { name: { [Op.iLike]: `%${search}%` } },
            { email: { [Op.iLike]: `%${search}%` } },
        ];
    }

    if (role) {
        where.role = role;
    }

    const { count, rows } = await User.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset: parseInt(offset),
        attributes: { exclude: ['password'] },
        order: [['created_at', 'DESC']],
    });

    return {
        users: rows,
        pagination: {
            total: count,
            page: parseInt(page),
            pages: Math.ceil(count / limit),
        },
    };
};

export const getUserById = async (id) => {
    console.log('Fetching user with id:', id);
    const user = await User.findByPk(id, {
        attributes: { exclude: ['password'] },
    });

    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    return user;
};

export const updateUser = async (id, updateData) => {
    const user = await User.findByPk(id);

    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    // Remove fields that shouldn't be updated
    delete updateData.password;
    delete updateData.role;
    delete updateData.email;

    await user.update(updateData);

    return user;
};

export const deleteUser = async (id) => {
    const user = await User.findByPk(id);

    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    await user.destroy();
    return true;
};