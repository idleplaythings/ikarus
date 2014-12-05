Company = function Company(args) {
  this._id = args._id || undefined;
  this.name = args.name;
  this.members = args.members || [];
}

Company.prototype.getId = function() {
  return this._id;
};

Company.prototype.getName = function() {
  return this.name;
}

Company.prototype.addMember = function(player) {
  this.members.push(player);
};

Company.prototype.getMembers = function() {
  return this.members;
}

Company.prototype.serialize = function(){
  return {
    name: this.name,
    members: this.members.map(function(member){
      return member.steamId
    })
  }
};
