Template.registerHelper('debug', function() {
  return Session.get('debug');
});

Template.registerHelper('dev', function() {
  return get(Meteor, 'settings.public.mode') === 'dev';
})
