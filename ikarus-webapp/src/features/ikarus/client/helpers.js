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

Template.registerHelper('currentSquad', function() {
  return Squad.getCurrent();
});
