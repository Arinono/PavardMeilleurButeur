const axios = require('axios');

const anonID = function() {
  const str = (size) => {
    let str = '';
    for (let i = 0; i < size; i++) {
      str += Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    }
    return str;
  }
  return `${str(2)}-${str(1)}-${str(1)}-${str(3)}`.toLowerCase();
}

const pavard = {
  url: "https://api.fifa.com/api/v1/elections/genericUser/election",
  method: "POST",
  headers: {
    "origin": "https://www.fifa.com",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7,it;q=0.6",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36",
    "content-type": "application/json",
    "accept": "application/json, text/javascript, */*; q=0.01",
    "referer": "https://www.fifa.com/worldcup/videos/goal-of-the-tournament/",
    "authority": "api.fifa.com"
  },
  json: true,
  data: {
    "AnonymousUserId": anonID(),
    "ElectionId":"9644ae06-b332-51be-b8f6-112b6e54539c",
    "SelectedOptions": [
      {
        "OptionId":"35454976-4581-1069-9be5-3e17b7ac80f9",
        "Order":0
      }
    ]
  }
};

const loop = function(i) {
  axios(pavard).then(response => {
    console.log(i);
    loop(++i);
  }).catch(err => {
    console.log(`attempt nº${i}`, err);
  })
}

loop(1);
