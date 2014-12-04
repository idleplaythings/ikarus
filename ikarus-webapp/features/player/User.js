User = (function(){
  'use strict';

  function User(args){
    this.steamId = args.services.steam.id;
    this.name = args.services.steam.username;
  }

  return User;
})();