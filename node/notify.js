let fs = require('fs');
let restler = require('restler');
let Utils = require('./utils');

let SERVICE_HOSTNAME =
  'https://us-central1-notify-b7652.cloudfunctions.net/sendNotification';

module.exports = function (text, title) {

  let regFile = Utils.getYamlRegFileOrMigrate();

  if (Object.keys(regFile.keys).length !== 0) {
    for (let key in regFile.keys) {
      console.log(`[notify] Notifying ${key}`);
      restler.get(SERVICE_HOSTNAME, {
        query: {
          to: key,
          text: text,
          title: title,
        },
      }).on('complete', function (result, response) {
        if (result.success) {
          console.log(`[notify] Successfully notifed ${key}`);
        }
      });
    }
  } else {
    console.error(
      '[notify] No keys have been registered. ' +
      'Register a key with `notify -r {key}`.');
  }
};
