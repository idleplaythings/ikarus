Template.character_appearance.helpers({
  getHeadGear: function () {
    return appearance.headgear;
  },

  isHeadgearSelected: function (name) {
    return Player.getCurrent().getHeadgear() == name;
  },

  getUniforms: function () {
    return appearance.uniforms;
  },

  isUniformSelected: function (name) {
    return Player.getCurrent().getUniform() == name;
  },

  getVests: function () {
    return appearance.vests;
  },

  isVestSelected: function (name) {
    return Player.getCurrent().getVest() == name;
  },

  getModUrl: function() {
    var params = [
      '-world=empty',
      '-nosplash',
      '-mod=@ikarus'
    ];

    return 'steam://run/107410//' + params.join('%20');
  }
});

Template.character_appearance.events({
  'change #headgear-select': function (event, template) {
    var selected = jQuery('#headgear-select option:selected').val();
    Meteor.call('changeAppearance', {headgear: selected});
  },

  'change #uniform-select': function (event, template) {
    var selected = jQuery('#uniform-select option:selected').val();
    Meteor.call('changeAppearance', {uniform: selected});
  },

  'change #vest-select': function (event, template) {
    var selected = jQuery('#vest-select option:selected').val();
    Meteor.call('changeAppearance', {vest: selected});
  },

  'click #parse-from-armory': function (event, template) {
    var code = jQuery('#code-from-armory').val();
    var gear = dic.get('ArmaArmoryParser').parse(code);
    Meteor.call('changeAppearance', gear);
  }
});