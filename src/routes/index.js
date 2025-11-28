// const express = require('express');
import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import adCampaignRoutes from './adCampaignRoutes.js';
import locationsRoutes from './locationsRoutes.js';
import paymentRoutes from './paymentRoutes.js';
import TransactionsRoutes from './TransactionsRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/adcampaigns', adCampaignRoutes);
router.use('/locations', locationsRoutes);
router.use('/payments', paymentRoutes);
router.use('/transactions', TransactionsRoutes);

export default router;