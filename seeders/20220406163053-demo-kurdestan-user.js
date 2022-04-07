'use strict';
const moment = require('moment')

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         */
        await queryInterface.bulkInsert('UserKurdistans', [{
            username: "mohammad",
            password: "mohammad",
            group_id: 1,
            createdAt: moment(new Date()).format('yyyy-MM-D H:m:s'),
            updatedAt: moment(new Date()).format('yyyy-MM-D H:m:s')
        }], {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         */
        await queryInterface.bulkDelete('UserKurdistans', null, {});
    }
};