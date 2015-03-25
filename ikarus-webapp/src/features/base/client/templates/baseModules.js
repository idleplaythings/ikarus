

Template.base_modules.helpers({
  primaryModules: function() {
    return BaseModule.getPrimaryModules();
  },

  normalModules: function() {
    return BaseModule.getNormalModules();
  }
});

Template.base_module.helpers({
  getStatusClass: function() {

    if (isSelected(this)) {
      return "panel-info";
    }

    if (isInvalid(this)) {
      return "panel-danger";
    }
  },

  isSelected: function() {
    return isSelected(this);
  }

});

Template.base_modules.events({
  'click .module' : function() {
    var moduleId = jQuery(event.target).attr("data-moduleId");
    var module = BaseModule.create(moduleId);
    console.log(module);

    Meteor.call(
      'changeBaseModule',
      moduleId,
      function (error, result) {
        console.log(error, result);
      }
    );
  }
});

function isSelected(module) {
  var company = Company.getCurrent();
  return company.getBaseModules().some(function(selectedModule) {
    return selectedModule._id == module._id;
  });
}

function isInvalid(module) {
  return false;
}