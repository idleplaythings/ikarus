

Template.base_modules.helpers({
  primaryModules: function() {
    return BaseModule.getPrimaryModules();
  },

  normalModules: function() {
    return BaseModule.getNormalModules();
  },

  spaceUsedBySecondaryModules: function() {
    var modules = this.getBaseModules();
    var size = 0;
    modules.forEach(function(selectedModule) {
      if (! selectedModule.isPrimary()) {
        size += selectedModule.size;
      }
    });

    return size;
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

    Meteor.call(
      'changeBaseModule',
      moduleId
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