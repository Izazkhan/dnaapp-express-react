import { ApiResponse } from "../../utils/apiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import AdCampaignDeliverable from "../models/AdCampaignDeliverable.js";
import AdCampaignAgeRange from "../models/AdCampaignAgeRange.js";
import AdCampaignEngagementRange from "../models/AdCampaignEngagementRange.js";
import AdCampaignService from "../services/adCampaignService.js";
import { Op } from "sequelize";
import { sequelize } from "../../config/database.js";
import AdCampaignDemographicService from "../services/adCampaignDemographicService.js";

class AdCampaignsController {
    constructor() {
        this.service = AdCampaignService;
        this.demographicService = AdCampaignDemographicService;
    }

    create = asyncHandler(async (req, res) => {
        const t = await sequelize.transaction();
        const campaign = await this.service.create(req.body);
        const demographic = await this.demographicService.createDemographicWithAgeRanges(campaign.id, req.body.demographics, t);
        await t.commit();
        res.status(200).json(new ApiResponse('message', campaign));
    });

    get = asyncHandler(async (req, res) => {
        const campaign = await this.service.get(req.params.id);
        res.status(200).json(new ApiResponse('message', campaign));
    })

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