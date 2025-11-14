'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const deliverables = [
      {
        name: "Reel",
        slug: "reel",
        is_active: true,
      }, {
        name: "Post",
        slug: "post",
        is_active: true
      }
    ];
    await queryInterface.bulkInsert('ad_campaign_deliverables', deliverables, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('Truncate table ad_campaign_deliverables CASCADE;');

  }
};
