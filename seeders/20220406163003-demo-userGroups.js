'use strict';
const moment = require('moment')

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         */
        await queryInterface.bulkInsert('UserGroups', [{
                name: "consumer",
                description: "consumer group for users",
                createdAt: moment(new Date()).format('yyyy-MM-D H:m:s'),
                updatedAt: moment(new Date()).format('yyyy-MM-D H:m:s')
            },
            {
                name: "store",
                description: "store group for users",
                createdAt: moment(new Date()).format('yyyy-MM-D H:m:s'),
                updatedAt: moment(new Date()).format('yyyy-MM-D H:m:s')
            }, {
                name: "marketer",
                description: "marketer group for users",
                createdAt: moment(new Date()).format('yyyy-MM-D H:m:s'),
                updatedAt: moment(new Date()).format('yyyy-MM-D H:m:s')
            }, {
                name: "digiman",
                description: "digiman group for users",
                createdAt: moment(new Date()).format('yyyy-MM-D H:m:s'),
                updatedAt: moment(new Date()).format('yyyy-MM-D H:m:s')
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         */
        await queryInterface.bulkDelete('UserGroups', null, {});
    }
};