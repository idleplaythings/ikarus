AppearanceService = function AppearanceService() {}

AppearanceService.prototype.changeAppearance = function (player, gear) {

  if (gear.uniform && isValidUniform(gear.uniform)){
    player.setUniform(gear.uniform);
  }

  if (gear.vest && isValidVest(gear.vest)){
    player.setVest(gear.vest);
  }

  if (gear.headgear && isValidHeadgear(gear.headgear)){
    player.setHeadgear(gear.headgear);
  }
};

var isValidUniform = function(name) {
  return isValid(name, appearance.uniforms);
}

var isValidVest = function(name) {
  return isValid(name, appearance.vests);
}

var isValidHeadgear = function(name) {
  return isValid(name, appearance.headgear);
}

var isValid = function(name, list) {
  return list.filter(function(entry) {
    return entry.name === name;
  }).pop();
};