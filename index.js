// const RadioBrowser = require('radio-browser');
//
// let filter = {
//   "offset": 0,
//   "limit": 25,
//   "language": "czech",
//   "hidebroken": true,
//   "order": "clickcount",
//   "reverse": true
// };
//
// (async function main() {
//   try {
//     let data = await RadioBrowser.getServerStats()
//     console.log(`API Server: ${RadioBrowser.service_url}`)
//     console.log('stats', data)
//
//     console.log('===================')
//     console.log('===================')
//     console.log('===================')
//
//     const stations = await RadioBrowser.getStations(filter);
//     for(const station of stations) {
//       console.log(station.name);
//     }
//
//     console.log('===================')
//     console.log('===================')
//     console.log('===================')
//
//   } catch (e) {
//     console.error(e);
//   }
// })();

const fetch = require('node-fetch');
const fs = require('fs');

(async function main() {
  const response  = await fetch("https://de1.api.radio-browser.info/json/stations/search", {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "en,nl;q=0.9,cs;q=0.8,de;q=0.7",
      "cache-control": "no-cache",
      "content-type": "application/json",
      "pragma": "no-cache",
      "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site"
    },
    "referrer": "https://www.radio-browser.info/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": "{\"offset\":0,\"language\":\"czech\",\"hidebroken\":true,\"order\":\"clickcount\",\"reverse\":true}",
    "method": "POST",
    "mode": "cors"
  });

  const stations = await response.text()
  const stationsJson = JSON.parse(stations);
  let content = '';
  for (const station of stationsJson) {
    content += `"${station.name}","${station.url}"\n`;
  }
  console.log(content);
  fs.writeFileSync(`${__dirname}/cz-stations.csv`, content);
})();
