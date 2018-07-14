cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-app-preferences.apppreferences",
    "file": "plugins/cordova-plugin-app-preferences/www/apppreferences.js",
    "pluginId": "cordova-plugin-app-preferences",
    "clobbers": [
      "plugins.appPreferences"
    ]
  },
  {
    "id": "cordova-plugin-device.device",
    "file": "plugins/cordova-plugin-device/www/device.js",
    "pluginId": "cordova-plugin-device",
    "clobbers": [
      "device"
    ]
  },
  {
    "id": "phonegap-plugin-push.PushNotification",
    "file": "plugins/phonegap-plugin-push/www/push.js",
    "pluginId": "phonegap-plugin-push",
    "clobbers": [
      "PushNotification"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-app-preferences": "0.99.4",
  "cordova-plugin-device": "1.1.6",
  "cordova-plugin-whitelist": "1.3.2",
  "phonegap-plugin-push": "2.1.3"
};
// BOTTOM OF METADATA
});