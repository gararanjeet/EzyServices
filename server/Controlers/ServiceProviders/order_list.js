const Order = require("../../Models/Order");

const serviceProvider_accepted_list = async (req, res) => {
  const { id } = req.query;
  try {
    const result = await Order.find(
      { assignedTo: id, status: "ACCEPTED" },
      {
        _id: 1,
        bookingUid: 1,
        name: 1,
        phone: 1,
        address: 1,
        service: 1,
        serviceDate: 1,
        slot: 1,
        status: 1,
        subService: 1,
      }
    );
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
  // db.query(
  //   "SELECT `b`.`id`, `b`.`booking_uid`, `b`.`name`, `b`.`phone_no` as `phone`,`b`.`address`,`s`.`name` as `service`, `b`.`service_date` as `date`, `sl`.`start` as `slot`, `b`.`status`,`sb`.`name` FROM `booking` AS `b` INNER JOIN `service` AS `s` ON `s`.`id` = `b`.`service_id` INNER JOIN `sub_service` AS `sb` ON `sb`.`id` = `b`.`sub_service_id` INNER JOIN `slot` AS `sl` ON `sl`.`id` = `b`.`slot_id` LEFT JOIN `account`AS `a` on `a`.`id` = `b`.`assigned_to` WHERE `b`.`assigned_to` = ? AND `b`.`status` = ? ",
  //   [id, "ACCEPTED"],
  //   (err, result) => {
  //     if (err) res.status(500).send(err);
  //     return res.send(result);
  //   }
  // );
};

module.exports = { serviceProvider_accepted_list };
