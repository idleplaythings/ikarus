isDevMode = function isDevMode() {
  return get(Meteor, 'settings.public.mode') === 'dev';
}
