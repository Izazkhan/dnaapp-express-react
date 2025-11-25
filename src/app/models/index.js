import AdCampaign from './AdCampaign.js';
import AdCampaignDemographic from './AdCampaignDemographic.js';
import AdCampaignDemographicAgeRanges from './AdCampaignDemographicAgeRanges.js';
import AdCampaignLocation from './AdCampaignLocation.js';
import DataCity from './DataCity.js';
import DataCountry from './DataCountry.js';
import DataState from './DataState.js';
import PasswordReset from './PasswordReset.js';
import User from './User.js';
// Define associations here
PasswordReset.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasOne(PasswordReset, { foreignKey: 'user_id', as: 'passwordReset' });

DataCountry.hasMany(DataState, { foreignKey: 'data_country_id', as: 'state' });
DataState.hasMany(DataCity, { foreignKey: 'data_state_id', as: 'city' });

DataCity.belongsTo(DataState, { foreignKey: 'data_state_id', as: 'state' });
DataState.belongsTo(DataCountry, { foreignKey: 'data_country_id', as: 'country' });

AdCampaign.hasOne(AdCampaignDemographic, { foreignKey: 'ad_campaign_id', as: 'demographics' });
AdCampaignDemographic.belongsTo(AdCampaign, { foreignKey: 'ad_campaign_id', as: 'ad_campaign' });

AdCampaignDemographic.hasMany(AdCampaignDemographicAgeRanges, { foreignKey: 'ad_campaign_demographic_id', as: 'age_ranges' });
AdCampaignDemographicAgeRanges.belongsTo(AdCampaignDemographic, { foreignKey: 'ad_campaign_demographic_id', as: 'demographic' });

AdCampaign.hasMany(AdCampaignLocation, { foreignKey: 'ad_campaign_id', as: 'locations' });
AdCampaignLocation.belongsTo(AdCampaign, { foreignKey: 'ad_campaign_id', as: 'ad_campaign' });

export {
    User,
    PasswordReset,
    DataCountry,
    DataState,
    DataCity,
    AdCampaign,
    AdCampaignDemographic
}