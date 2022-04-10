'use strict';
const moment = require('moment')
const crypto = require('crypto');
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

        await queryInterface.bulkInsert('Users', [{
            username: 'mohammad',
            password: 'mohammad',
            province_table_id: 20,
            province_user_id: 1,
            openId: crypto.randomBytes(20).toString('hex'),
            socketId: '',
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
         * await queryInterface.bulkDelete('Users', null, {});
         */
        await queryInterface.bulkDelete('Users', null, {});

    }
};