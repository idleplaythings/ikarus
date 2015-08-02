
var latestDependecy = new Tracker.Dependency();

function changeLatestDependency() {
  latestDependecy.changed();
  Meteor.setTimeout(changeLatestDependency, 1000);
}

changeLatestDependency();

Template.latestCombatLogLink.events({
  'click .combatLogLink': function() {
    var company = Company.getCurrent();

    if (! company) {
      return;
    }

    var log = CombatLog.getLatest();

    currentIsNew = false;
    latestDependecy.changed();
    Router.go('combat report', {_id: log._id});
  }
});

Template.latestCombatLogLink.helpers({
  hasCombatLog: function() {
    var company = Company.getCurrent();

    if (! company) {
      return false;
    }

    return Boolean(CombatLog.getLatest());
  },

  combatLogHeader: function () {
    var company = Company.getCurrent();
    latestDependecy.depend();

    if (! company) {
      return;
    }

    var log = CombatLog.getLatest();

    return isNew(log) ? "NEW COMBAT REPORT AVAILABLE!" : log.getLatestHeader();
  },

  combatLogNewClass: function () {
    var company = Company.getCurrent();
    latestDependecy.depend();

    if (! company) {
      return "";
    }

    var log = CombatLog.getLatest(company);
    return isNew(log) ? "new" : "";
  }
});

var currentId = null;
var currentIsNew = false;

function isNew(combatLog) {

  if (! currentId) {
    currentId = combatLog._id;
    return false;
  }

  if (currentId != combatLog._id) {
    currentId = combatLog._id;
    currentIsNew = true;
    return currentIsNew;
  }

  return currentIsNew;
};