'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            username: {
                allowNull: false,
                type: Sequelize.STRING
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING
            },
            province_table_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'UserProvinceTables', // 'UserProvinceTables' would also work
                    key: 'id'
                }
            },
            province_user_id: {
                allowNull: false,
                type: Sequelize.INTEGER

            },
            openId: {
                allowNull: false,
                type: Sequelize.STRING
            },
            group_id: {
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

        // await queryInterface.addConstraint('Users', {
        //     fields: ['column_name'],
        //     type: 'foreign key',
        //     name: 'custom_fkey_constraint_name', // optional
        //     references: {
        //         table: 'target_table_name',
        //         field: 'target_column_name'
        //     },
        //     onDelete: 'cascade',
        //     onUpdate: 'cascade'
        // });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Users');
    }
};