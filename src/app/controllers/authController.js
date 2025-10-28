import * as authService from '../services/authService.js';
import asyncHandler from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/apiResponse.js';

export const register = asyncHandler(async (req, res) => {
    const result = await authService.register(req.body);
    res.status(201).json(new ApiResponse(201, 'User registered successfully', result));
});

export const login = asyncHandler(async (req, res) => {
    const result = await authService.login(req.body);
    res.status(200).json(new ApiResponse(200, 'Login successful', result));
});

export const refreshToken = asyncHandler(async (req, res) => {
    const result = await authService.refreshToken(req.body.refreshToken);
    res.status(200).json(new ApiResponse(200, 'Token refreshed', result));
});