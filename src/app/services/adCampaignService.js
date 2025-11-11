import AdCampaign from "../models/AdCampaign.js"

class AdCampaignService {
    
    constructor() {}

    async create(data) {
        return await AdCampaign.create(data);
    }
}

export default new AdCampaignService();