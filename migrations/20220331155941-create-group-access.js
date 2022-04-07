'use strict';


module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('GroupAccesses', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            observer_group_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'UserGroups', // 'Movies' would also work
                    key: 'id'
                }
            },
            watching_group_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'UserGroups', // 'Movies' would also work
                    key: 'id'
                }
            },
            user_group_access: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'UserAccesses', // 'Movies' would also work
                    key: 'id'
                }
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
        await queryInterface.dropTable('GroupAccesses');
    }
};