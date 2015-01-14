Meteor.methods({

  'changeHideoutLocation': function(location) {
    var player = Player.getCurrent();
    var company = Company.getByPlayer(player);

    if (! company) {
      throw new Meteor.Error(404, 'Company not found');
    }

    if (location.x < 0 || location.x > 30000 || location.y < 0 || location.y > 28000) {
      throw new Meteor.Error('invalid hideout location', 'Invalid hideout location');
    }

    company.setHideout(location);
  },

  createCompany: function(name) {
    // @todo validation does not belong here
    if (! name || name.length < 5) {
      return;
    }

    if (Player.getCurrent() === null) {
      throw new Meteor.Error(403, 'You have to log in to create a company.');
    }

    var company = Company.create();
    company.setName(name);
    company.addPlayer(Player.getCurrent());

    dic.get('LootController').addStartingLoot(company);
  },

  inviteToCompany: function(playerName) {
    var player = Player.getCurrent()

    if (player === null) {
      throw new Meteor.Error(403, 'You have to log in to invite members.');
    }

    var company = Company.getByPlayer(player);

    if (company === null) {
      throw new Meteor.Error(403, 'You have to belong to a company to invite members.');
    }

    var invitee = Player.getByName(playerName);

    if (invitee == null) {
      throw new Meteor.Error(404, 'Player not found');
    }

    if (invitee.hasInvite(company) || Company.getByPlayer(invitee)) {
      throw new Meteor.Error(404, 'Player already belongs to a company, or already has an invite');
    }

    company.invite(invitee);
  },

  joinCompany: function(playerId, companyId) {
    var player = Player.getById(playerId);
    var company = Company.getById(companyId);
    company.addPlayer(player);
  },

  leaveCompany: function(playerId, companyId) {
    var player = Player.getById(playerId);
    var company = Company.getById(companyId);

    var squad = Squad.getByPlayer(player);

    if (squad){
      throw new Meteor.Error(400, "Can't leave company while in squad");
    }
    company.removePlayer(player);
  },
  renameCurrentCompany: function(newName) {
    var company = Company.getCurrent();

    if (! company) {
      throw new Meteor.Error(400, "You are not in a company");
    }

    company.setName(newName);
  }
});
