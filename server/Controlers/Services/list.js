const Service = require("../../Models/Service");

// service_list
const service_list = async (req, res) => {
  try {
    let services = [];
    let result = await Service.find({}, { name: 1, _id: 0 });
    result.forEach((obj) => services.push(obj.name));
    res.send(services);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = { service_list };
