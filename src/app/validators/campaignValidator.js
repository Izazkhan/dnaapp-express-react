import Joi from 'joi';

export const validateCreateCampaign = Joi.object({
    name: Joi.string()
        .trim()
        .required()
        .messages({
            'any.required': 'Campaign name is required',
        }),

    description: Joi.string().trim().max(5000).optional()
        .messages({
            'string.max': 'Description cannot exceed 5000 characters',
        }),

    platform: Joi.string()
        .valid('instagram', 'tiktok')
        .required()
        .messages({
            'any.only': 'Platform must be instagram or tiktok',
            'any.required': 'Platform is required',
        }),

    follower_min: Joi.number().integer().min(0).optional()
        .messages({
            'number.min': 'Minimum followers cannot be negative',
        }),

    follower_max: Joi.number().integer().min(0).optional()
        .custom((value, helpers) => {
            const min = helpers.state.ancestors[0].follower_min;
            if (min !== undefined && value < min) {
                return helpers.error('any.invalid');
            }
            return value;
        })
        .messages({
            'any.invalid': 'follower_max must be ≥ follower_min',
        }),

    likes_min: Joi.number().integer().min(0).optional(),
    likes_max: Joi.number().integer().min(0).optional()
        .custom((value, helpers) => {
            const min = helpers.state.ancestors[0].likes_min;
            if (min !== undefined && value < min) {
                return helpers.error('any.invalid');
            }
            return value;
        })
        .messages({
            'any.invalid': 'likes_max must be ≥ likes_min',
        }),

    ad_campaign_engagement_range_id: Joi.number().integer().positive().required()
        .messages({
            'number.base': 'Engagement range ID must be a number',
            'any.required': 'Engagement range is required',
        }),

    publish_from: Joi.date().iso().required()
        .messages({
            'date.format': 'publish_from must be in ISO format (YYYY-MM-DDTHH:mm:ssZ)',
            'any.required': 'Start date is required',
        }),

    publish_until: Joi.date().iso().min(Joi.ref('publish_from')).optional()
        .messages({
            'date.min': 'publish_until must be after publish_from',
            'date.format': 'publish_until must be in ISO format',
        }),

    ad_campaign_deliverable_id: Joi.number().integer().positive().required()
        .messages({
            'number.base': 'Deliverable ID must be a number',
            'any.required': 'Deliverable is required',
        }),

    genre_id: Joi.number().integer().positive().optional(),

    ad_campaign_payment_type_id: Joi.number().integer().positive().optional(),

    price: Joi.number().precision(2).min(0).optional()
        .messages({
            'number.min': 'Price cannot be negative',
            'number.precision': 'Price must have max 2 decimal places',
        }),

    is_test: Joi.boolean().optional().default(false),
    is_published: Joi.boolean().optional().default(false),

    is_matching: Joi.boolean().optional(),

    archived: Joi.boolean().optional().default(false),

    impressions_cap: Joi.number().integer().min(0).optional(),

    story_impressions_min: Joi.number().integer().min(0).optional().default(0),
    story_impressions_max: Joi.number().integer().min(0).optional().default(0)
        .custom((value, helpers) => {
            const min = helpers.state.ancestors[0].story_impressions_min;
            if (min > value) {
                return helpers.error('any.invalid');
            }
            return value;
        })
        .messages({
            'any.invalid': 'story_impressions_max must be ≥ story_impressions_min',
        }),

    meta: Joi.object().optional().unknown(true)
});