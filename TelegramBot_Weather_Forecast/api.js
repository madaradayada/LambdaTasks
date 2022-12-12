const axios = require("axios");
require("dotenv").config();

const url = `https://api.openweathermap.org/data/2.5/weather?q=Kiev,ua&appid=${process.env.OPENWEATHERMAPAPIKEY}&units=metric`;

function sendForcastMin() {
   axios.get(url)
   .then(response => {
    console.log(response.data);
   })
   .catch((error) => {
    console.error(error);
   });
}

// function sendForcastMax() {
// }
sendForcastMin();

module.exports = sendForcastMin;
// module.exports = sendForcastMax;