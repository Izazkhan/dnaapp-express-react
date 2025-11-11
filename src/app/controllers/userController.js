// controllers/UserAuthController.js
import asyncHandler from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/apiResponse.js';
import UserService from '../services/userService.js';
import AuthService from '../services/authService.js';

class UserAuthController {
    // GET current authenticated user
    getMe = asyncHandler(async (req, res) => {
        res.status(200).json(new ApiResponse('User retrieved', req.user));
    });

    // Update authenticated user
    updateMe = asyncHandler(async (req, res) => {
        const updates = req.body;
        const result = await UserService.updateUser(req.user.id, updates);
        res.status(200).json(new ApiResponse('User updated', result));
    });

    // Delete authenticated user
    deleteMe = asyncHandler(async (req, res) => {
        await UserService.deleteUser(req.user.id);
        await AuthService.logout(req, res); // clear session/token
        res.status(200).json(new ApiResponse('Account deleted'));
    });

    // Admin: Get all users
    getAllUsers = asyncHandler(async (req, res) => {
        const result = await UserService.getAllUsers(req.query);
        res.status(200).json(new ApiResponse('Users retrieved', result));
    });

    // Admin: Get user by ID
    getUserById = asyncHandler(async (req, res) => {
        const result = await UserService.getUserById(req.params.id);
        res.status(200).json(new ApiResponse('User retrieved', result));
    });

    // Admin: Delete user by ID
    deleteUser = asyncHandler(async (req, res) => {
        await UserService.deleteUser(req.params.id);
        res.status(200).json(new ApiResponse('User deleted'));
    });
}

export default new UserAuthController();