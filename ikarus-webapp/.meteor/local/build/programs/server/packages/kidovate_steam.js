(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var OAuth = Package.oauth.OAuth;
var Oauth = Package.oauth.Oauth;
var HTTP = Package.http.HTTP;
var _ = Package.underscore._;
var ServiceConfiguration = Package['service-configuration'].ServiceConfiguration;

/* Package-scope variables */
var Steam;

(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/kidovate:steam/steam_server.js                                                                        //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
Steam = {};                                                                                                       // 1
                                                                                                                  // 2
Oauth.registerService('steam', 2, null, function(query) {                                                         // 3
  // XX fix the state                                                                                             // 4
  query.state = _.last(query['openid.return_to'].split('?close&'));                                               // 5
  var steamId = getSteamId(query);                                                                                // 6
  var identity = getIdentity(steamId);                                                                            // 7
                                                                                                                  // 8
  return {                                                                                                        // 9
    serviceData: {                                                                                                // 10
      id: identity.steamid,                                                                                       // 11
      username: identity.personaname,                                                                             // 12
      avatar: {                                                                                                   // 13
      	small: identity.avatar,                                                                                    // 14
      	medium: identity.avatarmedium,                                                                             // 15
      	full: identity.avatarfull                                                                                  // 16
      }                                                                                                           // 17
    },                                                                                                            // 18
    options: {profile: { name: identity.personaname }}                                                            // 19
  };                                                                                                              // 20
});                                                                                                               // 21
                                                                                                                  // 22
var getSteamId = function (query) {                                                                               // 23
  var config = ServiceConfiguration.configurations.findOne({service: 'steam'});                                   // 24
  if (!config)                                                                                                    // 25
    throw new ServiceConfiguration.ConfigError("Service not configured");                                         // 26
                                                                                                                  // 27
  var response;                                                                                                   // 28
  try {                                                                                                           // 29
    response = HTTP.post("https://steamcommunity.com/openid/login", { params: _.extend(query, { 'openid.mode': 'check_authentication' }) });
  } catch (err) {                                                                                                 // 31
    throw _.extend(new Error("Failed to complete OAuth handshake with Steam. " + err.message), { response: err.response });
  }                                                                                                               // 33
                                                                                                                  // 34
  if (response.content && response.content.indexOf("is_valid:true") !== -1) {                                     // 35
  	// Grab the SteamID from the claimed_id                                                                        // 36
  	return _.last(query['openid.claimed_id'].split('/'));                                                          // 37
  } else {                                                                                                        // 38
    throw new Error("Failed to complete OAuth handshake with Steam. " + response.data.error);                     // 39
  }                                                                                                               // 40
};                                                                                                                // 41
                                                                                                                  // 42
var getIdentity = function (steamId) {                                                                            // 43
  var config = ServiceConfiguration.configurations.findOne({service: 'steam'});                                   // 44
  if (!config)                                                                                                    // 45
    throw new ServiceConfiguration.ConfigError("Service not configured");                                         // 46
                                                                                                                  // 47
  var response;                                                                                                   // 48
  try {                                                                                                           // 49
    response = HTTP.get("http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/", {                     // 50
      params: {                                                                                                   // 51
      	key: config.apiKey,                                                                                        // 52
      	steamids: steamId                                                                                          // 53
      }                                                                                                           // 54
    });                                                                                                           // 55
                                                                                                                  // 56
    // Return the first player                                                                                    // 57
    return _.first(response.data.response.players);                                                               // 58
  } catch (err) {                                                                                                 // 59
    throw _.extend(new Error("Failed to fetch identity from Steam. " + err.message), { response: err.response }); // 60
  }                                                                                                               // 61
};                                                                                                                // 62
                                                                                                                  // 63
                                                                                                                  // 64
Steam.retrieveCredential = function(credentialToken) {                                                            // 65
  return Oauth.retrieveCredential(credentialToken);                                                               // 66
};                                                                                                                // 67
Steam.getIdentity = getIdentity;                                                                                  // 68
                                                                                                                  // 69
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['kidovate:steam'] = {
  Steam: Steam
};

})();

//# sourceMappingURL=kidovate_steam.js.map
