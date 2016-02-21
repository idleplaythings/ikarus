Meteor.methods({
  'changeBaseModule' : function(moduleId) {
    var company = Company.getCurrent();

    if (! company) {
      throw new Meteor.Error('Not found', 'Company not found');
    }

    var player = Player.getCurrent();
    if (! player || ! company.canManage(player)) {
      return;
    }

    var module = BaseModule.create(moduleId);
    var modules = company.getBaseModules();

    if (module.isPrimary()) {
      modules = modules.filter(function(selectedModule){
        return ! selectedModule.isPrimary();
      });
      modules.push(module);
      company.setBaseModules(modules);
    } else {

      var exists = modules.some(function(selectedModule) {
        return selectedModule._id == module._id;
      });

      if (exists) {
        removeModule(company, module, modules);
      } else {
        changeModule(company, module, modules);
      }
    }
  }
});

function removeModule(company, module, modules) {
  modules = modules.filter(function(selectedModule) {
    return selectedModule._id != module._id;
  });

  company.setBaseModules(modules);
};

function changeModule(company, module, modules) {
  var spaceAvailable = 3;

  modules.forEach(function(selectedModule) {
    if (! selectedModule.isPrimary()) {
      spaceAvailable -= selectedModule.size;
    }
  });

  if (spaceAvailable < module.size) {
    throw new Meteor.Error('Not eneough space', 'No room for this secondary module');
  }

  modules.push(module);
  company.setBaseModules(modules);
};