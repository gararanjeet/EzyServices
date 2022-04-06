CREATE TABLE `ezyservices`.`slot` ( `id` BIGINT(20) NOT NULL AUTO_INCREMENT , `start` TIME NOT NULL , `end` TIME NOT NULL , `is_deleted` TINYINT NOT NULL DEFAULT '0' , `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , `updated_at` DATETIME on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`)) ENGINE = InnoDB; 

ALTER TABLE `slot` ADD `service_id` BIGINT(20) NOT NULL AFTER `id`; 

ALTER TABLE `slot` ADD FOREIGN KEY (`service_id`) REFERENCES `service`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT; 