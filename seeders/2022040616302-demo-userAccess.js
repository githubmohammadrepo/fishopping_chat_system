'use strict';
const moment = require('moment')

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         */
        await queryInterface.bulkInsert('UserAccesses', [{
                name: "consumer Access",
                description: "consumer Access group for users",
                createdAt: moment(new Date()).format('yyyy-MM-D H:m:s'),
                updatedAt: moment(new Date()).format('yyyy-MM-D H:m:s')
            },
            {
                name: "store Access",
                description: "store Access group for users",
                createdAt: moment(new Date()).format('yyyy-MM-D H:m:s'),
                updatedAt: moment(new Date()).format('yyyy-MM-D H:m:s')
            }, {
                name: "marketer Access",
                description: "marketer Access group for users",
                createdAt: moment(new Date()).format('yyyy-MM-D H:m:s'),
                updatedAt: moment(new Date()).format('yyyy-MM-D H:m:s')
            }, {
                name: "digiman Access",
                description: "digiman Access group for users",
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
        await queryInterface.bulkDelete('UserAccesses', null, {});
    }
};