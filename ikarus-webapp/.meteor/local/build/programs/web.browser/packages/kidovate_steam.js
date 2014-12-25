//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
//                                                                      //
// If you are using Chrome, open the Developer Tools and click the gear //
// icon in its lower right corner. In the General Settings panel, turn  //
// on 'Enable source maps'.                                             //
//                                                                      //
// If you are using Firefox 23, go to `about:config` and set the        //
// `devtools.debugger.source-maps-enabled` preference to true.          //
// (The preference should be on by default in Firefox 24; versions      //
// older than 23 do not support source maps.)                           //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var OAuth = Package.oauth.OAuth;
var Oauth = Package.oauth.Oauth;
var _ = Package.underscore._;
var ServiceConfiguration = Package['service-configuration'].ServiceConfiguration;
var Random = Package.random.Random;
var Template = Package.templating.Template;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var Steam;

(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                             //
// packages/kidovate:steam/template.steam_configure.js                                         //
//                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                               //
                                                                                               // 1
Template.__checkName("configureLoginServiceDialogForSteam");                                   // 2
Template["configureLoginServiceDialogForSteam"] = new Template("Template.configureLoginServiceDialogForSteam", (function() {
  var view = this;                                                                             // 4
  return [ HTML.Raw("<p>\n    First, you'll need to get a Steam Web API Key. Follow these steps:\n  </p>\n  "), HTML.OL("\n    ", HTML.Raw('<li>\n      Visit <a href="http://steamcommunity.com/dev/apikey" target="blank">http://steamcommunity.com/dev/apikey</a>\n    </li>'), "\n    ", HTML.LI("\n      Set Domain Name to: ", HTML.SPAN({
    "class": "url"                                                                             // 6
  }, Blaze.View(function() {                                                                   // 7
    return Spacebars.mustache(view.lookup("siteUrl"));                                         // 8
  })), "\n    "), "\n    ", HTML.Raw("<li>\n      Accept the Terms of Use\n    </li>"), "\n    ", HTML.Raw('<li>\n      Click "Register"\n    </li>'), "\n  ") ];
}));                                                                                           // 10
                                                                                               // 11
/////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                             //
// packages/kidovate:steam/steam_configure.js                                                  //
//                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                               //
Template.configureLoginServiceDialogForSteam.siteUrl = function () {                           // 1
  return Meteor.absoluteUrl();                                                                 // 2
};                                                                                             // 3
                                                                                               // 4
Template.configureLoginServiceDialogForSteam.fields = function () {                            // 5
  return [                                                                                     // 6
    {property: 'apiKey', label: 'Steam Web API Key'}                                           // 7
  ];                                                                                           // 8
};                                                                                             // 9
                                                                                               // 10
/////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                             //
// packages/kidovate:steam/steam_client.js                                                     //
//                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                               //
Steam = {};                                                                                    // 1
                                                                                               // 2
// Request Steam credentials for the user                                                      // 3
// @param options {optional}                                                                   // 4
// @param credentialRequestCompleteCallback {Function} Callback function to call on            // 5
//   completion. Takes one argument, credentialToken on success, or Error on                   // 6
//   error.                                                                                    // 7
Steam.requestCredential = function (options, credentialRequestCompleteCallback) {              // 8
  // support both (options, callback) and (callback).                                          // 9
  if (!credentialRequestCompleteCallback && typeof options === 'function') {                   // 10
    credentialRequestCompleteCallback = options;                                               // 11
    options = {};                                                                              // 12
  } else if (!options) {                                                                       // 13
    options = {};                                                                              // 14
  }                                                                                            // 15
                                                                                               // 16
  var config = ServiceConfiguration.configurations.findOne({service: 'steam'});                // 17
  if (!config) {                                                                               // 18
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError("Service not configured"));
    return;                                                                                    // 20
  }                                                                                            // 21
                                                                                               // 22
  var credentialToken = Random.id();                                                           // 23
                                                                                               // 24
  var loginUrl =                                                                               // 25
        'https://steamcommunity.com/openid/login' +                                            // 26
        '?openid.ns=http://specs.openid.net/auth/2.0' +                                        // 27
        '&openid.mode=checkid_setup' +                                                         // 28
        // As I couldn't find a better place to stick in the '&state=' I simply put it here    // 29
        '&openid.return_to=' + Meteor.absoluteUrl('_oauth/steam?close%26' + credentialToken) + // 30
        '&openid.realm=' + Meteor.absoluteUrl() +                                              // 31
        '&openid.identity=http://specs.openid.net/auth/2.0/identifier_select' +                // 32
        '&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select' +              // 33
        '&state=' + credentialToken;                                                           // 34
                                                                                               // 35
  Oauth.initiateLogin(credentialToken,                                                         // 36
                      loginUrl,                                                                // 37
                      credentialRequestCompleteCallback,                                       // 38
                      { width: 960, height: 640 });                                            // 39
};                                                                                             // 40
                                                                                               // 41
/////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['kidovate:steam'] = {
  Steam: Steam
};

})();
