const Order = require("../../Models/Order");

const serviceProvider_completed_list = async (req, res) => {
  const { id } = req.query;
  try {
    const result = await Order.find(
      { assignedTo: id, status: "COMPLETED" },
      {
        _id: 1,
        bookingUid: 1,
        name: 1,
        phone: 1,
        address: 1,
        service: 1,
        serviceDate: 1,
        slot: 1,
        subService: 1,
      }
    );
    console.log(result);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
  // db.query(
  //   "SELECT `b`.`id`, `b`.`booking_uid`, `b`.`name`, `b`.`phone_no` as `phone`,`b`.`address`,`s`.`name` as `service`, `b`.`service_date` as `date`, `sl`.`start` as `slot`, `b`.`status`,`sb`.`name` FROM `booking` AS `b` INNER JOIN `service` AS `s` ON `s`.`id` = `b`.`service_id` INNER JOIN `sub_service` AS `sb` ON `sb`.`id` = `b`.`sub_service_id` INNER JOIN `slot` AS `sl` ON `sl`.`id` = `b`.`slot_id` LEFT JOIN `account`AS `a` on `a`.`id` = `b`.`assigned_to` WHERE `b`.`assigned_to` = ? AND `b`.`status` = ? ",
  //   [id, "COMPLETED"],
  //   (err, result) => {
  //     if (err) res.status(500).send(err);
  //     return res.send(result);
  //   }
  // );
};

module.exports = { serviceProvider_completed_list };
