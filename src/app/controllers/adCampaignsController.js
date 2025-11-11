import { ApiResponse } from "../../utils/apiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import AdCampaignService from "../services/adCampaignService.js";

class AdCampaignsController {
    constructor() {
        this.service = AdCampaignService;
    }

    create = asyncHandler(async (req, res) => {
        const result = await this.service.create(req.body);
        res.status(200).json(new ApiResponse('message', result));
    });
}

export default new AdCampaignsController();