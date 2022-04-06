CREATE TABLE `ezyservices`.`booking` ( `id` BIGINT(20) NOT NULL AUTO_INCREMENT , `booking_uid` VARCHAR(120) NOT NULL , `service_id` BIGINT(20) NOT NULL , `address_id` BIGINT(20) NOT NULL , `account_id` BIGINT(20) NOT NULL , `status` TEXT NOT NULL , `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , `updated_at` DATETIME on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`)) ENGINE = InnoDB; 

ALTER TABLE `booking` CHANGE `address_id` `address` VARCHAR(120) NOT NULL; 

ALTER TABLE `booking` ADD FOREIGN KEY (`account_id`) REFERENCES `account`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT; 

ALTER TABLE `booking` ADD FOREIGN KEY (`service_id`) REFERENCES `service`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT; 

ALTER TABLE `booking` ADD `service_date` DATE NOT NULL AFTER `service_id`; 

ALTER TABLE `booking` ADD `slot_id` BIGINT NOT NULL AFTER `service_date`;

ALTER TABLE `booking` ADD FOREIGN KEY (`slot_id`) REFERENCES `slot`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE `booking` ADD `sub_service_id` BIGINT NOT NULL AFTER `service_id`; 

ALTER TABLE `booking` ADD FOREIGN KEY (`sub_service_id`) REFERENCES `sub_service`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT; 

ALTER TABLE `booking` CHANGE `status` `status` ENUM('pending','assigned','completed','winthdrawn') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL; 

ALTER TABLE `booking` ADD `name` VARCHAR(120) NOT NULL AFTER `account_id`, ADD `phone_no` VARCHAR(10) NOT NULL AFTER `name`, ADD `mail` VARCHAR(120) NOT NULL AFTER `phone_no`; 

ALTER TABLE `booking` ADD UNIQUE(`booking_uid`);