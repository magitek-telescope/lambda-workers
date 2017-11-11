module.exports.index = (event, context, callback) => {
  console.log(event.path.id);

  const axios = require("axios");
  const jsdom = require("jsdom");
  const contributions = {
    yesterday: 0,
    today: 0
  };

  axios.get(`https://github.com/users/${event.path.id}/contributions`)
  .then((res)=>{
    console.log("success.");

    global.document = jsdom.jsdom(
      `<!DOCTYPE html><html><head></head><body>${res.data}</body></html>`
    );
    const target = document.querySelectorAll('rect');
    contributions.yesterday = target[target.length-2].getAttribute("data-count");
    contributions.today = target[target.length-1].getAttribute("data-count");

    const response = {
      statusCode: 200,
      body: {
        id: event.path.id,
        message: "success.",
        contributions: contributions
      }
    };

    callback(null, response);
  })
  .catch((err)=>{
    console.log("fail.");

    const response = {
      statusCode: 500,
      body: {
        id: event.path.id,
        message: "fail."
      },
    }

    callback(null, response)
  });

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
}
