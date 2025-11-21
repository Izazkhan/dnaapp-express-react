import { AdCampaign } from "../models/index.js";

class AdCampaignService {

    constructor() { }

    async create(data) {
        return await AdCampaign.create(data);
    }

    async get(id) {
        return await AdCampaign.findByPk(id, { include: 'demographics' });
    }
}

export default new AdCampaignService();