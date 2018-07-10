let fs = require('fs');
let restler = require('restler');

let Utils = require('./utils');

let SERVICE_HOSTNAME = 'https://us-central1-notify-b7652.cloudfunctions.net/sendNotification';

module.exports = function(text, title) {
  let keys = Utils.getRegFile().split(/\n+/).filter(key => key);
  if (!keys.length) {
    console.log(
      '[notify] No keys have been registered.' +
      ' Register a key with `notify -r {key}`.'
    );
    return;
  }
  for (let key of keys) {
    console.log('[notify] Notifying ' + key);
    restler.get(SERVICE_HOSTNAME, {
      query: {
        to: key,
        text: text,
        title: title,
      },
    }).on('complete', function(result, response) {
      if (result.success) {
        console.log('[notify] Successfully notifed ' + key);
      }
    });
  }
};
