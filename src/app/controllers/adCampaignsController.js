import { ApiResponse } from "../../utils/apiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import AdCampaignDeliverable from "../models/AdCampaignDeliverable.js";
import AdCampaignAgeRange from "../models/AdCampaignAgeRange.js";
import AdCampaignEngagementRange from "../models/AdCampaignEngagementRange.js";
import AdCampaignService from "../services/adCampaignService.js";
import { Op } from "sequelize";

class AdCampaignsController {
    constructor() {
        this.service = AdCampaignService;
    }

    create = asyncHandler(async (req, res) => {
        const result = await this.service.create(req.body);
        res.status(200).json(new ApiResponse('message', result));
    });

    getEngagementRanges = asyncHandler(async (req, res) => {
        const ranges = await AdCampaignEngagementRange.findAll({ order: [['order', 'ASC']] });
        res.json({ data: ranges });
    })

    getDeliverables = asyncHandler(async (req, res) => {
        const result = await AdCampaignDeliverable.findAll();
        res.json({ data: result });
    })

    getAgeRanges = asyncHandler(async (req, res) => {
        const result = await AdCampaignAgeRange.findAll();
        res.json({ data: result });
    })

    options = asyncHandler(async (req, res) => {
        const result = {
            deliverables: await AdCampaignDeliverable.findAll(),
            age_ranges: await AdCampaignAgeRange.findAll({
                where: {
                    name: { [Op.ne]: '13-17' }
                }
            }),
            engagement_ranges: await AdCampaignEngagementRange.findAll({ order: [['order', 'ASC']] })
        }
        res.json({ data: result });
    })
}

export default new AdCampaignsController();