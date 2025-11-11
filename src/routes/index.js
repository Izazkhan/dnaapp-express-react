// const express = require('express');
import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import adCampaignRoutes from './adCampaignRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/adcampaigns', adCampaignRoutes);

export default router;