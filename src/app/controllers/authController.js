import * as authService from '../services/authService.js';
import asyncHandler from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/apiResponse.js';

export const register = asyncHandler(async (req, res) => {
    const result = await authService.register(req.body);
    res.cookie('refreshToken', result.refreshToken, { httpOnly: true, secure: true });
    delete result.refreshToken; // Remove refreshToken from response body
    res.status(201).json(new ApiResponse(201, 'User registered successfully', result));
});

export const login = asyncHandler(async (req, res) => {
    console.log('Login Request Body:', req.body);
    const result = await authService.login(req.body);
    res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: true
    });
    delete result.refreshToken; // Remove refreshToken from response body
    res.status(200).json(new ApiResponse(200, 'Login successful', result));
});

export const logout = asyncHandler(async (req, res) => {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    });
    res.status(200).json(new ApiResponse(200, 'Logout successful'));
});

export const refreshToken = asyncHandler(async (req, res) => {
    const result = await authService.refreshToken();
    res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    });
    delete result.refreshToken; // Remove refreshToken from response body
    res.status(200).json(new ApiResponse(200, 'Token refreshed', result));
});

export const resetPassword = asyncHandler(async (req, res) => {
    console.log('Reset Password Request Body:', req.body);
    await authService.resetPassword(req.body);
    res.status(200).json(new ApiResponse(200, 'Password reset successful'));
});

export const forgotPassword = asyncHandler(async (req, res) => {
    console.log('Forgot Password Request Body:', req.body);
    const result = await authService.forgotPassword(req.body.email);
    res.status(200).json(new ApiResponse(200, 'Forgot password email sentt', {result}));
});