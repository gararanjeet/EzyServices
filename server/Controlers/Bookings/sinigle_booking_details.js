const Order = require("../../Models/Order");

const booking_details = async (req, res) => {
  const { bookingUid, id } = req.query;
  try {
    const result = await Order.aggregate([
      {
        $match: {
          bookingUid,
        },
      },
      {
        $lookup: {
          from: "accounts",
          localField: "assignedTo",
          foreignField: "_id",
          as: "assigned",
        },
      },
      {
        $project: {
          _id: 1,
          bookingUid: 1,
          name: 1,
          phone: 1,
          address: 1,
          email: 1,
          assignedTo: 1,
          assignedName: { $first: "$assigned.userName" },
          service: 1,
          subService: 1,
          serviceDate: 1,
          slot: 1,
          status: 1,
        },
      },
    ]);
    console.log(result);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
  // db.query(
  //   "SELECT `b`.`id`, `b`.`booking_uid`, `b`.`name`, `b`.`phone_no` as `phone`,`b`.`address`,`b`.`mail`,`a`.`user_name` as `assigned_name`, `b`.`assigned_to` as `assigned_id`, `s`.`name` as `service`, `sb`.`name` as `sub_service`, `b`.`service_date` as `date`, `sl`.`start` as `slot`, `b`.`status` FROM `booking` AS `b` INNER JOIN `service` AS `s` ON `s`.`id` = `b`.`service_id`INNER JOIN `sub_service` AS `sb` ON `sb`.`id` = `b`.`sub_service_id`INNER JOIN `slot` AS `sl` ON `sl`.`id` = `b`.`slot_id` LEFT JOIN `account`AS `a` on `a`.`id` = `b`.`assigned_to` WHERE `b`.`booking_uid` = ? AND `b`.`account_id` = ?",
  //   [booking_uid, id],
  //   (err, result) => {
  //     if (err) return res.status(500).send(err);
  //     return res.send(result);
  //   }
  // );
};

module.exports = { booking_details };
