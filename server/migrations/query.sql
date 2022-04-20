-- View bookings
SELECT booking_uid, name as service, sub_service, price, service_date, start, end, price FROM (SELECT booking_uid,service_date, sub_service_id, status, start, end, name  FROM ( SELECT booking_uid,service_date,b.service_id, sub_service_id, status, start, end FROM `booking` as b INNER JOIN `slot` as s on s.id = b.slot_id WHERE account_id = ? ) as result INNER JOIN service on result.service_id = service.id) AS result INNER JOIN sub_service ON result.sub_service_id = sub_service.id


-- SELECT ALL SERVICE PROVIDERS
SELECT id, user_name, email, phone, role FROM `account` WHERE type = "SERVICE_PROVIDER" AND state = 1




--view all bookings for owner
SELECT `b`.`id`, `b`.`booking_uid`, `b`.`name`, `b`.`phone_no` as `phone`,
`b`.`address`, `s`.`name` as `service`, `b`.`service_date` as `date`, `sl`.`start` as `slot`, `b`.`status`
FROM `booking` AS `b` 
INNER JOIN `service` AS `s` ON `s`.`id` = `b`.`service_id`
INNER JOIN `sub_service` AS `sb` ON `sb`.`id` = `b`.`sub_service_id`
INNER JOIN `slot` AS `sl` ON `sl`.`id` = `b`.`slot_id`
;