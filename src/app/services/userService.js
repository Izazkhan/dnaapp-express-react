// services/UserService.js
import { User } from '../models/index.js';
import { ApiError } from '../../utils/apiResponse.js';
import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';

class UserService {
    constructor() {
        this.DEFAULT_LIMIT = 10;
        this.DEFAULT_PAGE = 1;
    }

    // Get all users with pagination, search, and role filter
    async getAllUsers(query) {
        const { page = this.DEFAULT_PAGE, limit = this.DEFAULT_LIMIT, search, role } = query;
        const offset = (parseInt(page) - 1) * parseInt(limit);

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
            offset,
            attributes: { exclude: ['password', 'refresh_token'] },
            order: [['created_at', 'DESC']],
        });

        return {
            users: rows,
            pagination: {
                total: count,
                page: parseInt(page),
                limit: parseInt(limit),
                pages: Math.ceil(count / limit),
            },
        };
    }

    // Get user by ID
    async getUserById(id) {
        const user = await User.findByPk(id, {
            attributes: { exclude: ['password', 'refresh_token'] },
        });

        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        return user;
    }

    // Update user (with optional password hash)
    async updateUser(id, updateData) {
        const user = await User.findByPk(id);
        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        // Handle password update securely
        if (updateData.password && updateData.password.length > 0) {
            const hashedPassword = await bcrypt.hash(updateData.password, 10);
            updateData = { ...updateData, password: hashedPassword };
        } else {
            delete updateData.password; // Prevent empty string from overwriting
        }

        await user.update(updateData);
        return user.reload(); // Return fresh data
    }

    // Delete user
    async deleteUser(id) {
        const user = await User.findByPk(id);
        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        await user.destroy();
        return true;
    }
}

// Export singleton instance
export default new UserService();