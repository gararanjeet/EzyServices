CREATE TABLE `ezyservices`.`assigned` ( `id` BIGINT NOT NULL AUTO_INCREMENT , `service_provider_id` BIGINT NOT NULL , `booking_uid` BIGINT NOT NULL , `state` ENUM('ASSIGNED ','ACCEPTED','REJECTED','') NOT NULL , `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , `updated_at` DATETIME on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`)) ENGINE = InnoDB; 

ALTER TABLE `assigned` CHANGE `booking_id` `booking_id` VARCHAR(120) NOT NULL; 

ALTER TABLE `assigned` ADD FOREIGN KEY (`booking_id`) REFERENCES `booking`(`booking_uid`) ON DELETE RESTRICT ON UPDATE RESTRICT; ALTER TABLE `assigned` ADD FOREIGN KEY (`service_provider_id`) REFERENCES `account`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT; 