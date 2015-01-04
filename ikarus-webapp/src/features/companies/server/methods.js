Meteor.methods({
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
    company.removePlayer(player);
  }
});
