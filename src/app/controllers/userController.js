import * as userService from '../services/userService.js';
import asyncHandler from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/apiResponse.js';

export const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(new ApiResponse(200, 'User retrieved', req.user));
});

export const updateMe = asyncHandler(async (req, res) => {
    const result = await userService.updateUser(req.user.id, req.body);
    res.status(200).json(new ApiResponse(200, 'User updated successfully', result));
});

export const deleteMe = asyncHandler(async (req, res) => {
    await userService.deleteUser(req.user.id);
    res.status(200).json(new ApiResponse(200, 'User deleted successfully'));
});

export const getAllUsers = asyncHandler(async (req, res) => {
    const result = await userService.getAllUsers(req.query);
    res.status(200).json(new ApiResponse(200, 'Users retrieved', result));
});

export const getUserById = asyncHandler(async (req, res) => {
    const result = await userService.getUserById(req.params.id);
    res.status(200).json(new ApiResponse(200, 'User retrieved', result));
});

export const deleteUser = asyncHandler(async (req, res) => {
    await userService.deleteUser(req.params.id);
    res.status(200).json(new ApiResponse(200, 'User deleted successfully'));
});