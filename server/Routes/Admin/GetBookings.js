const { db } = require("../../db");

const getBookings = (req, res) => {
  db.query(
    "SELECT `b`.`id`, `b`.`booking_uid`, `b`.`name`, `b`.`phone_no` as `phone`,`b`.`address`, `s`.`name` as `service`, `b`.`service_date` as `date`, `sl`.`start` as `slot`, `b`.`status` FROM `booking` AS `b` INNER JOIN `service` AS `s` ON `s`.`id` = `b`.`service_id`INNER JOIN `sub_service` AS `sb` ON `sb`.`id` = `b`.`sub_service_id`INNER JOIN `slot` AS `sl` ON `sl`.`id` = `b`.`slot_id`",
    (err, result) => {
      if (err) res.status(500).send(err);
      else res.send(result);
    }
  );
};

module.exports = { getBookings };
