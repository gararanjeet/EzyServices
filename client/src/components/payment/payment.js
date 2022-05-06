import axios from "../axios";
import logo from "../../images/Logo.svg";

//info -> data filled in the form
//submit -> handle submit function
//url -> url to create a payment order and get details from server
//token -> accesstoken

const displayRazorpay = async (info, submit, orderUrl, token) => {
  const res = await loadRazorpay();
  if (!res) return alert("there is an error");
  console.log(token);
  const data = await axios.post(
    orderUrl,
    {},
    {
      headers: { token: `Barear ${token}` },
    }
  );
  console.log(data.data);
  var options = {
    key: "rzp_test_51sJpmbPGsV2Nb", // Enter the Key ID generated from the Dashboard
    amount: data.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: data.data.currency,
    name: "EzyServices",
    // description: "Test Transaction",
    image: logo,
    order_id: data.data.id,
    handler: (obj) => {
      console.log(obj);
      submit(info);
    },
  };
  var paymentObject = new window.Razorpay(options);
  paymentObject.open();
};

const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export default displayRazorpay;
