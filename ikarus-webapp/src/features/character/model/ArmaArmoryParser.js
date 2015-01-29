ArmaArmoryParser = function ArmaArmoryParser() {

}

ArmaArmoryParser.prototype.parse = function(input) {
  var regUnifroms = /this forceAddUniform "([\w_]*)";/;
  var uniformClass = regUnifroms.exec(input) ? regUnifroms.exec(input)[1] : null;

  var regVest = /this addVest "([\w_]*)";/;
  var vestClass = regVest.exec(input) ? regVest.exec(input)[1] : null;

  var regHeadgear = /this addHeadgear "([\w_]*)";/;
  var headgearClass = regHeadgear.exec(input) ? regHeadgear.exec(input)[1] : null;

  return {
    uniform: getUniformName(uniformClass),
    vest: getVestName(vestClass),
    headgear: getHeadgearName(headgearClass)
  };
};

var getUniformName = function (armaClass) {
  var entry = appearance.uniforms.filter(function (uniform) {
    return hasClass(uniform, armaClass);
  }).pop();

  return entry ? entry.name : null;
};

var getVestName = function (armaClass) {
  var entry = appearance.vests.filter(function (vest) {
    return hasClass(vest, armaClass);
  }).pop();

  return entry ? entry.name : null;
};

var getHeadgearName = function (armaClass) {
  var entry = appearance.headgear.filter(function (headgear) {
    return hasClass(headgear, armaClass);
  }).pop();

  return entry ? entry.name : null;
};

var hasClass = function (entry, armaClass) {
  return entry.classes.indexOf(armaClass) > -1;
};