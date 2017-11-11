module.exports.index = (event, context, callback) => {
  const axios   = require("axios");
  const dotenv  = require("dotenv");
  const Twitter = require("twitter");
  const TimeStamp = require("./TimeStamp");
  dotenv.config();

  const client = new Twitter({
    consumer_key       : process.env.TC_CK,
    consumer_secret    : process.env.TC_CS,
    access_token_key   : process.env.TC_AT,
    access_token_secret: process.env.TC_AS
  });

  axios.get(`https://6yenm5uxq6.execute-api.ap-northeast-1.amazonaws.com/dev/users/${process.env.TC_ID}`)
  .then((res)=>{
    console.log("Success, fetch data.")
    const contributions = res.data.body.contributions;
    client.post(
      "statuses/update",
      {
        status: `[GitHub] ${TimeStamp.makeYesterday()}の Contribution 数は ${contributions.today} でした。`
      },
      (err, tweet, res)=>{
        if(err){
          console.log("Fail, tweet.");
        }else{
          console.log("Success, tweet.");
        }
        return callback(null);
      }
    )
  })
  .catch((err)=>{
    console.log("Fail, fetch data.")
    callback("Fail, fetch data.");
  });
};
