Template.registerHelper('debug', function() {
  return Session.get('debug');
});

Template.registerHelper('dev', function() {
  return isDevMode();
});

Template.registerHelper('currentPlayer', function() {
  return Player.getCurrent();
});

Template.registerHelper('currentCompany', function() {
  return Company.getCurrent();
});

Template.registerHelper('canManageCompany', function() {
  var company = Company.getCurrent();
  var player = Player.getCurrent();

  return company && player && company.canManage(player);
});

Template.registerHelper('currentSquad', function() {
  return Squad.getCurrent();
});

Template.registerHelper('currentPlayerIsAdmin', function() {
  return Player.getCurrent() ? Player.getCurrent().isAdmin() : false;
});
