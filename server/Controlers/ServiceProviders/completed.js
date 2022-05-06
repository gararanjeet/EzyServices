const { db } = require("../../db");

const serviceProvider_completed_list = (req, res) => {
  const { id } = req.query;
  db.query(
    "SELECT `b`.`id`, `b`.`booking_uid`, `b`.`name`, `b`.`phone_no` as `phone`,`b`.`address`,`s`.`name` as `service`, `b`.`service_date` as `date`, `sl`.`start` as `slot`, `b`.`status`,`sb`.`name` FROM `booking` AS `b` INNER JOIN `service` AS `s` ON `s`.`id` = `b`.`service_id` INNER JOIN `sub_service` AS `sb` ON `sb`.`id` = `b`.`sub_service_id` INNER JOIN `slot` AS `sl` ON `sl`.`id` = `b`.`slot_id` LEFT JOIN `account`AS `a` on `a`.`id` = `b`.`assigned_to` WHERE `b`.`assigned_to` = ? AND `b`.`status` = ? ",
    [id, "COMPLETED"],
    (err, result) => {
      if (err) res.status(500).send(err);
      return res.send(result);
    }
  );
};

module.exports = { serviceProvider_completed_list };
