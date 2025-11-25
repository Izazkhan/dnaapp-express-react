import { paginate } from "../../utils/pagination.js";
import { AdCampaign, AdCampaignDemographic } from "../models/index.js";

class AdCampaignService {

    constructor() { }

    async create(data) {
        const transformed = this.transformData(data);
        return await AdCampaign.create(transformed, {
            include: [{
                model: AdCampaignDemographic,
                as: 'demographics',
                include: 'age_ranges'
            }, 'locations']
        });
    }

    transformData(data) {
        let { demographics, locations, ...rest } = data;

        // Transform demographics: map age_range_ids to age_ranges association format
        demographics = {
            ...demographics,
            age_ranges: demographics?.age_range_ids ?
                demographics.age_range_ids.map(id => ({ age_range_id: id })) : []
        };
        delete demographics.age_range_ids; // Clean up raw key

        // Transform locations: rename city_id -> data_city_id, state_id -> data_state_id, etc.
        // Assumes locations is an array; map over each item
        locations = locations?.map(loc => ({
            ...loc,
            data_city_id: loc.city_id,
            data_state_id: loc.state_id,
            data_country_id: loc.country_id,
            radius_miles: loc.radius_miles
        })) || [];

        // Remove raw keys if needed (optional, for cleanliness)
        locations.forEach(loc => {
            delete loc.city_id;
            delete loc.state_id;
            delete loc.country_id;
        });

        return {
            ...rest,
            demographics,
            locations
        };
    }

    async get(id) {
        return await AdCampaign.findByPk(id, {
            include: [{
                model: AdCampaignDemographic,
                include: 'age_ranges',
                as: 'demographics'
            }, 'locations']
        });
    }

    async getAllWithSimplePagination(query) {
        const { limit, offset } = paginate(query);

        let campaigns = await AdCampaign.findAll({
            include: [{
                model: AdCampaignDemographic,
                include: 'age_ranges',
                as: 'demographics'
            }, 'locations'],
            limit,
            offset,
            order: [['created_at', 'DESC']]
        });
        campaigns = this.transformCampaignsResponseData(campaigns);
        return {
            campaigns: campaigns
        }
    }

    transformCampaignsResponseData(campaigns) {
        return campaigns.map(campaign => this.transformCampaignResponseData(campaign));
    }

    transformCampaignResponseData(campaign) {
        const campaignData = campaign.toJSON();

        if (campaignData.locations) {
            campaignData.locations = campaignData.locations.map(loc => {
                return {
                    city_id: loc.data_city_id,
                    state_id: loc.data_state_id,
                    country_id: loc.data_country_id,
                    radius_miles: loc.radius_miles
                }
            });
        }
        // Transform demographics age_ranges to age_range_ids
        if (campaignData.demographics) {
            campaignData.demographics.age_range_ids = campaignData.demographics.age_ranges?.filter(ar => ar.age_range_id != null).map(ar => ar.age_range_id);
            delete campaignData.demographics.age_ranges; // Clean up raw key
        }
        return campaignData;
    }
}

export default new AdCampaignService();