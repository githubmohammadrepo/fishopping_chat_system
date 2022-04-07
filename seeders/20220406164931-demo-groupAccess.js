'use strict';
const moment = require('moment')

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         */
        await queryInterface.bulkInsert('GroupAccesses', [{
                observer_group_id: 1,
                watching_group_id: 1,
                user_group_access: 1,
                createdAt: moment(new Date()).format('yyyy-MM-D H:m:s'),
                updatedAt: moment(new Date()).format('yyyy-MM-D H:m:s')
            }, {
                observer_group_id: 1,
                watching_group_id: 2,
                user_group_access: 1,
                createdAt: moment(new Date()).format('yyyy-MM-D H:m:s'),
                updatedAt: moment(new Date()).format('yyyy-MM-D H:m:s')
            },
            {
                observer_group_id: 2,
                watching_group_id: 2,
                user_group_access: 2,
                createdAt: moment(new Date()).format('yyyy-MM-D H:m:s'),
                updatedAt: moment(new Date()).format('yyyy-MM-D H:m:s')
            }, {
                observer_group_id: 2,
                watching_group_id: 1,
                user_group_access: 2,
                createdAt: moment(new Date()).format('yyyy-MM-D H:m:s'),
                updatedAt: moment(new Date()).format('yyyy-MM-D H:m:s')
            }, {
                observer_group_id: 3,
                watching_group_id: 3,
                user_group_access: 3,
                createdAt: moment(new Date()).format('yyyy-MM-D H:m:s'),
                updatedAt: moment(new Date()).format('yyyy-MM-D H:m:s')
            }, {
                observer_group_id: 3,
                watching_group_id: 2,
                user_group_access: 3,
                createdAt: moment(new Date()).format('yyyy-MM-D H:m:s'),
                updatedAt: moment(new Date()).format('yyyy-MM-D H:m:s')
            }, {
                observer_group_id: 4,
                watching_group_id: 4,
                user_group_access: 4,
                createdAt: moment(new Date()).format('yyyy-MM-D H:m:s'),
                updatedAt: moment(new Date()).format('yyyy-MM-D H:m:s')
            }, {
                observer_group_id: 4,
                watching_group_id: 1,
                user_group_access: 4,
                createdAt: moment(new Date()).format('yyyy-MM-D H:m:s'),
                updatedAt: moment(new Date()).format('yyyy-MM-D H:m:s')
            }, {
                observer_group_id: 4,
                watching_group_id: 2,
                user_group_access: 4,
                createdAt: moment(new Date()).format('yyyy-MM-D H:m:s'),
                updatedAt: moment(new Date()).format('yyyy-MM-D H:m:s')
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         */
        await queryInterface.bulkDelete('GroupAccesses', null, {});
    }
};