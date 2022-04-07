'use strict';
const moment = require('moment');
var crypto = require("crypto");

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
        let tableNames = [
            { id: 1, tableName: 'azarbaijanSharqhi' },
            { id: 2, tableName: 'azarbaijanQharbi' },
            { id: 3, tableName: 'ardabil' },
            { id: 4, tableName: 'esfahan' },
            { id: 5, tableName: 'alborz' },
            { id: 6, tableName: 'elam' },
            { id: 7, tableName: 'boshahr' },
            { id: 8, tableName: "tehran" },
            { id: 9, tableName: 'chaharmahalBakhtiari' },
            { id: 10, tableName: 'khorasanJenobi' },
            { id: 11, tableName: 'khorasanRazavi' },
            { id: 12, tableName: 'khorasanShomali' },
            { id: 13, tableName: 'khozestan' },
            { id: 14, tableName: 'zanjan' },
            { id: 15, tableName: 'semnan' },
            { id: 16, tableName: 'sistanBlochestan' },
            { id: 17, tableName: 'fars' },
            { id: 18, tableName: 'qhazvin' },
            { id: 19, tableName: 'qhom' },
            { id: 20, tableName: 'kurdistan' },
            { id: 21, tableName: 'kerman' },
            { id: 22, tableName: 'kermanshah' },
            { id: 23, tableName: 'kahkiloyehBoyerahman' },
            { id: 24, tableName: 'golestan' },
            { id: 25, tableName: 'gilan' },
            { id: 26, tableName: 'lorestan' },
            { id: 27, tableName: 'mazandaran' },
            { id: 28, tableName: 'markazi' },
            { id: 29, tableName: 'hormozgan' },
            { id: 30, tableName: 'hamadan' },
            { id: 31, tableName: 'yazd' }
        ];


        await queryInterface.bulkInsert('UserProvinceTables', tableNames.map((table) => {
            return {
                id: table.id,
                userTableName: table.tableName,
                privateToken: crypto.randomBytes(20).toString('hex'),
                province_id: table.id,
                province_name: table.tableName,
                createdAt: moment(new Date()).format('yyyy-MM-D H:m:s'),
                updatedAt: moment(new Date()).format('yyyy-MM-D H:m:s')
            }
        }), {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */

        await queryInterface.bulkDelete('UserProvinceTables', null, {});

    }
};