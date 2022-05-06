const { db } = require("../../db");
// bookings_list
const bookings_list = (req, res) => {
  db.query(
    "SELECT `b`.`id`, `b`.`booking_uid`, `b`.`name`, `b`.`phone_no` as `phone`,`b`.`address`,`b`.`mail`,`a`.`user_name` as `assigned_name`, `b`.`assigned_to` as `assigned_id`, `s`.`name` as `service`, `sb`.`name` as `sub_service`, `b`.`service_date` as `date`, `sl`.`start` as `slot`, `b`.`status` FROM `booking` AS `b` INNER JOIN `service` AS `s` ON `s`.`id` = `b`.`service_id`INNER JOIN `sub_service` AS `sb` ON `sb`.`id` = `b`.`sub_service_id`INNER JOIN `slot` AS `sl` ON `sl`.`id` = `b`.`slot_id` LEFT JOIN `account`AS `a` on `a`.`id` = `b`.`assigned_to`",
    (err, result) => {
      if (err) res.status(500).send(err);
      else res.send(result);
    }
  );
};

module.exports = { bookings_list };
