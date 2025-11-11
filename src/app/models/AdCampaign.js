// models/AdCampaign.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database.js';

const AdCampaign = sequelize.define('AdCampaign', {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        comment: 'Foreign key to users table',
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Campaign name is required' },
        },
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    published: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        validate: {
            isIn: [[0, 1]],
        },
    },
    is_matching: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    is_test: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    is_published: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    platform: {
        type: DataTypes.STRING(32),
        allowNull: true,
        validate: {
            isIn: {
                args: [['instagram', 'tiktok']],
                msg: 'Invalid platform',
            },
        },
    },
    follower_min: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: { min: 0 },
    },
    follower_max: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: { min: 0 },
    },
    likes_min: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: { min: 0 },
    },
    likes_max: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: { min: 0 },
    },
    ad_campaign_engagement_range_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    publish_from: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    publish_until: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
            isDate: true,
            isAfterPublishFrom(value) {
                if (value && this.publish_from && new Date(value) <= new Date(this.publish_from)) {
                    throw new Error('publish_until must be after publish_from');
                }
            },
        },
    },
    ad_campaign_deliverable_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    genre_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    ad_campaign_payment_type_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
    },
    price: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: true,
        defaultValue: 0.00,
        validate: {
            isDecimal: true,
            min: { args: [0], msg: 'Price cannot be negative' },
        },
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    draft_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    archived: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    impressions_cap: {
        type: DataTypes.BIGINT,
        allowNull: true,
        validate: { min: 0 },
    },
    story_impressions_min: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        defaultValue: 0,
        validate: { min: 0 },
    },
    story_impressions_max: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        defaultValue: 0,
        validate: { min: 0 },
    },
    is_approval_required: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    ad_campaign_genre_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
    },
    meta: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    impressions_cap_state: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        validate: { isInt: true },
    }
}, {
    tableName: 'ad_campaigns',
    timestamps: false, // You're using created_at/updated_at manually
    indexes: [
        { fields: ['user_id'] },
        { fields: ['published'] },
        { fields: ['platform'] },
        { fields: ['publish_from'] },
        { fields: ['ad_campaign_type_id'] },
    ],
});

// Optional: Add hooks for auto-updating timestamps
AdCampaign.beforeCreate((instance) => {
    instance.created_at = new Date();
    instance.updated_at = new Date();
});

AdCampaign.beforeUpdate((instance) => {
    instance.updated_at = new Date();
});

export default AdCampaign;