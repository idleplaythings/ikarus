Meteor.methods({

  'ensureAllCompaniesHaveOwner': function () {

    var player = Player.getCurrent();

    if (! player || ! player.isAdmin()) {
      return;
    }

    Company.getAll().filter(function (company) {
      return ! company.getOwner();
    }).forEach(function (company) {
      company.findNewOwner();
    })
  },

  'promoteMember': function (targetId) {

    var player = Player.getCurrent();
    var company = Company.getCurrent();
    var target = Player.getByMeteorId(targetId);

    if (! company || ! player || ! target) {
      throw new Meteor.Error(404, 'Company or player not found');
    }

    if (! company.isOwner(player)) {
      throw new Meteor.Error(403, 'Only owner can manage members');
    }

    if (! target.getCompany() || target.getCompany()._id !== company._id) {
      throw new Meteor.Error(404, 'Company or player not found');
    }

    if (company.isOfficer(target)) {
      throw new Meteor.Error(404, 'Company or player not found');
    }

    company.addOfficer(target);
  },

  'demoteMember': function (targetId) {

    var player = Player.getCurrent();
    var company = Company.getCurrent();
    var target = Player.getByMeteorId(targetId);

    if (! company || ! player || ! target) {
      throw new Meteor.Error(404, 'Company or player not found');
    }

    if (! company.isOwner(player)) {
      throw new Meteor.Error(403, 'Only owner can manage members');
    }

    if (! target.getCompany() || target.getCompany()._id !== company._id) {
      throw new Meteor.Error(404, 'Company or player not found');
    }

    if (! company.isOfficer(target)) {
      throw new Meteor.Error(404, 'Company or player not found');
    }

    company.removeOfficer(target);
  },

  'removeMember': function (targetId) {

    var player = Player.getCurrent();
    var company = Company.getCurrent();
    var target = Player.getByMeteorId(targetId);

    if (! company || ! player || ! target) {
      throw new Meteor.Error(404, 'Company or player not found');
    }

    if (! company.isOwner(player)) {
      throw new Meteor.Error(403, 'Only owner can manage members');
    }

    if (! target.getCompany() || target.getCompany()._id !== company._id) {
      throw new Meteor.Error(404, 'Company or player not found');
    }

    company.removePlayer(target);
  },

  'makeOwner': function (targetId) {

    var player = Player.getCurrent();
    var company = Company.getCurrent();
    var target = Player.getByMeteorId(targetId);

    if (! company || ! player || ! target) {
      throw new Meteor.Error(404, 'Company or player not found');
    }

    if (! company.isOwner(player)) {
      throw new Meteor.Error(403, 'Only owner can manage members');
    }

    if (! target.getCompany() || target.getCompany()._id !== company._id) {
      throw new Meteor.Error(404, 'Company or player not found');
    }

    company.setOwner(target);
  },

  'sellout': function () {

    var company = Company.getCurrent();

    if (! company) {
      throw new Meteor.Error(404, 'Company not found');
    }

    var player = Player.getCurrent();

    if (! player || ! company.canManage(player)) {
      return;
    }

    var amount = company.getAmountOfMoneyFromSellout();

    if (! amount) {
      return;
    }

    company.resetRenown();

    var armory = Inventory.getByCompany(company);
    var item = dic.get('ItemFactory').createItemByArmaClass('money');
    console.log(amount, item);
    Inventory.addToInventory(armory, item, amount);
  },

  'changeHideoutLocation': function(location) {
    var player = Player.getCurrent();
    var company = Company.getByPlayer(player);

    if (! company) {
      throw new Meteor.Error(404, 'Company not found');
    }

    if (! player || ! company.canManage(player)) {
      return;
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

  inviteToCompany: function(playerId) {
    var player = Player.getCurrent();

    if (player === null) {
      throw new Meteor.Error(403, 'You have to log in to invite members.');
    }

    var company = Company.getByPlayer(player);

    if (company === null) {
      throw new Meteor.Error(403, 'You have to belong to a company to invite members.');
    }

    if (! company.canManage(player)) {
      return;
    }

    var invitee = Player.getByMeteorId(playerId);

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
    player.removeInvites();
  },

  leaveCompany: function() {
    var player = Player.getCurrent();

    if (player === null) {
      throw new Meteor.Error(403, 'You have to log in to leave company.');
    }

    var company = Company.getByPlayer(player);

    if (company === null) {
      throw new Meteor.Error(403, 'You have to belong to a company to leave it.');
    }

    var squad = Squad.getByPlayer(player);

    if (squad){
      throw new Meteor.Error(400, "Can't leave company while in squad");
    }

    company.removePlayer(player);

    if (company.isEmpty()) {
      Inventory.removeByCompany(company);
      company.remove();
    }
  },
  renameCurrentCompany: function(newName) {
    var company = Company.getCurrent();

    if (! company) {
      throw new Meteor.Error(400, "You are not in a company");
    }

    company.setName(newName);
  }
});
