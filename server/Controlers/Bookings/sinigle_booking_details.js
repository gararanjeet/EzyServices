const { db } = require("../../db");

const booking_details = (req, res) => {
  const { booking_uid, id } = req.query;
  db.query(
    "SELECT `b`.`id`, `b`.`booking_uid`, `b`.`name`, `b`.`phone_no` as `phone`,`b`.`address`,`b`.`mail`,`a`.`user_name` as `assigned_name`, `b`.`assigned_to` as `assigned_id`, `s`.`name` as `service`, `b`.`service_date` as `date`, `sl`.`start` as `slot`, `b`.`status` FROM `booking` AS `b` INNER JOIN `service` AS `s` ON `s`.`id` = `b`.`service_id`INNER JOIN `sub_service` AS `sb` ON `sb`.`id` = `b`.`sub_service_id`INNER JOIN `slot` AS `sl` ON `sl`.`id` = `b`.`slot_id` LEFT JOIN `account`AS `a` on `a`.`id` = `b`.`assigned_to` WHERE `b`.`booking_uid` = ? AND `b`.`account_id` = ?",
    [booking_uid, id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      return res.send(result);
    }
  );
};

module.exports = { booking_details };
