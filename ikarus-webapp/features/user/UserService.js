UserService = (function(){
  'use strict';

  function UserService(){

  }

  UserService.prototype.getUserById = function(playerId){
    return docToUser(Meteor.users.findOne({'steam.id': playerId}));
  };

  UserService.prototype.getCurrentUser = function(){
    return docToUser(Meteor.user());
  };

  var docToUser = function(doc){
    if (! doc)
      return null;

    return new User(doc);
  };

  return UserService;
})();