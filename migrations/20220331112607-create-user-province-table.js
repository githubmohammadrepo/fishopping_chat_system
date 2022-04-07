'use strict';


module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('UserProvinceTables', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            userTableName: {
                type: Sequelize.STRING,
                unique: true
            },

            privateToken: {
                allowNull: false,
                type: Sequelize.STRING
            },

            province_id: {
                allowNull: false,
                type: Sequelize.STRING
            },

            province_name: {
                allowNull: false,
                type: Sequelize.STRING
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },

            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('UserProvinceTables');
    }
};