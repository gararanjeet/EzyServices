const { db } = require("../../db");

const getId = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `1V` + day + month + hours + minutes;
};
// booking_vehicleWaterService_create
const booking_vehicleWaterService_create = async (req, res) => {
  let { user_id, name, phone, email, vehicle, modal, date, slot, address } =
    req.body;
  slot = slot.split("-")[0];
  const service_id = 1;

  db.query("SELECT * FROM account WHERE ID = ?", [user_id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length !== 1) return resp.status(400).send("user Doesnt Exist");

    db.query(
      "SELECT id FROM sub_service WHERE name = ?",
      [vehicle],
      (err, result) => {
        if (err) return res.status(500).send(err);
        const sub_service_id = result[0].id;

        db.query(
          "SELECT id FROM slot WHERE start = ?",
          [slot],
          (err, result) => {
            if (err) return res.status(500).send(err);
            const slot_id = result[0].id;
            const status = "pending";
            const booking_uid = getId();
            db.query(
              "INSERT INTO booking (booking_uid, service_id, sub_service_id, service_date, slot_id, address, account_id, name, phone_no, mail, status) VALUES(?,?,?,?,?,?,?,?,?,?,?)",
              [
                booking_uid,
                service_id,
                sub_service_id,
                date,
                slot_id,
                address,
                user_id,
                name,
                phone,
                email,
                status,
              ],
              (err, result) => {
                if (err) return res.status(500).send(err);
                db.query(
                  "SELECT id FROM `booking` WHERE `booking_uid` = ?",
                  [booking_uid],
                  (err, result) => {
                    if (err) return res.status(500).send(err);
                    db.query(
                      "INSERT INTO `booking_status` (booking_id, status, status_by) VALUES(?,?,?)",
                      [result.id, "PENDING", user_id],
                      (err, result) => {
                        res.send({
                          message: "Booking Successfull",
                          booking_id: booking_uid,
                        });
                      }
                    );
                  }
                );
              }
            );
          }
        );
      }
    );
  });
};

module.exports = { booking_vehicleWaterService_create };
