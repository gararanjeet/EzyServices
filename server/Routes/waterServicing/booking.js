const { db } = require("../../db");

const getId = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `1V` + day + month + hours + minutes;
};

const booking = async (req, resp) => {
  let { user_id, name, phone, email, vehicle, modal, date, slot, address } =
    req.body;
  slot = slot.split("-")[0];
  const service_id = 1; //service_id for vehicle water servicing
  // console.log({
  //   user_id,
  //   name,
  //   phone,
  //   email,
  //   vehicle,
  //   modal,
  //   date,
  //   slot,
  //   address,
  // });

  db.query("SELECT * FROM account WHERE ID = ?", [user_id], (err, res) => {
    if (err) return resp.status(500).send(err);
    if (res.length !== 1) return resp.status(400).send("user Doesnt Exist");

    db.query(
      "SELECT id FROM sub_service WHERE sub_service = ?",
      [vehicle],
      (err, res) => {
        if (err) return resp.status(500).send(err);
        const sub_service_id = res[0].id;

        db.query("SELECT id FROM slot WHERE start = ?", [slot], (err, res) => {
          if (err) return resp.status(500).send(err);
          const slot_id = res[0].id;
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
            (err, res) => {
              if (err) {
                console.log(err);
                return resp.status(500).send(err);
              }
              resp.send({
                message: "Booking Successfull",
                booking_id: booking_uid,
              });
            }
          );
        });
      }
    );
  });
};

module.exports = { booking };
