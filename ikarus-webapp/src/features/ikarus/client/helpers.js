Template.registerHelper('debug', function() {
  return Session.get('debug');
});

Template.registerHelper('dev', function() {
  return get(Meteor, 'settings.public.mode') === 'dev';
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
