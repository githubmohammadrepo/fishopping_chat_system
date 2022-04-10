SELECT
    `User`.`id`,
    `User`.`username`,
    `User`.`password`,
    `User`.`province_table_id`,
    `User`.`province_user_id`,
    `User`.`openId`,
    `User`.`socketId`,
    `User`.`group_id`,
    `User`.`createdAt`,
    `User`.`updatedAt`,
    `UserGroup`.`id` AS `UserGroup.id`,
    `UserGroup`.`name` AS `UserGroup.name`,
    `UserGroup`.`description` AS `UserGroup.description`,
    `UserGroup`.`createdAt` AS `UserGroup.createdAt`,
    `UserGroup`.`updatedAt` AS `UserGroup.updatedAt`
FROM
    `Users` AS `User`
    LEFT OUTER JOIN `UserGroups` AS `UserGroup` ON `User`.`group_id` = `UserGroup`.`id`
WHERE
    `User`.`username` = 'mohammadRegister1'
    AND `User`.`province_id` = 20
LIMIT
    1;