exports.handler = function(_, __, callback){
  const axios = require('axios');
  const firebase = require('firebase');
  // if(process.env.NODE_ENV != 'production') require('dotenv').config();
  const misskey = Object.assign({}, axios);

  const { CSRF_TOKEN, APPNO, APIKEY, COOKIE } = process.env
  const API_ROOT = 'https://himasaku.misskey.link'
  const PUSH7_ROOT = 'https://api.push7.jp/api/v1';
  const config = {
    apiKey: process.env.FB_APIKEY,
    authDomain: "misskey-push7-notifier.firebaseapp.com",
    databaseURL: "https://misskey-push7-notifier.firebaseio.com",
    projectId: "misskey-push7-notifier",
    storageBucket: "misskey-push7-notifier.appspot.com",
    messagingSenderId: process.env.FB_SENDERID
  };

  function getBody(type, data){
    switch (type) {
      case 'like':
        return {
          title: `${data.content.user.name}にライクされました。`,
          body: data.content.post.text
        }
      case 'repost':
        return {
          title: `${data.content.user.name}にリポストされました。`,
          body: data.content.post.text
        }
      case 'mention':
        return {
          title: `${data.content.post.user.name}があなたをメンションしました。`,
          body: data.content.post.text
        }
      default:
        return {
          title: type + ": それ以外",
          body: "それ以外です。"
        }
    }
  }

  firebase.initializeApp(config);
  firebase.database().ref('/users/potato4d/latest').once('value').then((snapshot) =>{
    const cursor = +(snapshot.val());
    misskey.defaults.baseURL = API_ROOT;
    misskey.defaults.headers.common['cookie'] = COOKIE;
    misskey.defaults.headers.common['csrf-token'] = CSRF_TOKEN;
    misskey.post('/notifications/unread/count')
    .then((res)=>{
      console.log(res.data);
      if(res.data){
        return Promise.resolve('OK Unread');
      }
    })
    .then((res)=>{
      console.log(res);
      return misskey.post('/notifications/timeline')
    })
    .then((res)=>{
      return new Promise((resolve, reject)=>{
        const notifications = res.data.filter((n)=>(n.cursor > cursor));
        if(!notifications.length){
          resolve(res);return;
        }
        if(notifications.length){
          const insertId = notifications.reduce((a, b)=>{return a.cursor > b.cursor ? a : b}).cursor;
          firebase.database().ref('/users/potato4d').update({latest: ""+insertId})
          .then(()=>{resolve(res);return;})
          .catch(()=>{resolve(res);return;})
        }
      });
    })
    .then((res)=>{
      axios.defaults.headers.common['Authorization'] = `Bearer ${APIKEY}`;
      const notifications = res.data.filter((n)=>(n.cursor > cursor));
      if(!notifications.length){
        return Promise.resolve([]);
      }
      return Promise.all(
        notifications.map((n)=>
          axios.post(
            `${PUSH7_ROOT}/${APPNO}/send`,
            Object.assign(
              {
                icon: 'https://dashboard.push7.jp/uploads/4f56abbc9e3c4c3c8fc942e85d5151c3.png',
                url: 'https://misskey.link'
              },
              getBody(n.type, n)
            )
          )
        )
      );
    })
    .then((res)=>{
      firebase.database().goOffline()
      console.log('さいご');
      callback(null, "success");
      // return Promise.resolve();
    })
    .catch((err)=>{
      console.log(err);
    });
  });
}
