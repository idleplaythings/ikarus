Template.companies_status.created = function () {
  Meteor.subscribe('Users');
  Meteor.subscribe('Companies');
};

Template.companies_status.helpers({
  company: function () {
    return Company.getById(this.companyId);
  },
  ownCompany: function () {
    var player = Player.getCurrent();

    if (player) {
      var company = Company.getById(this.companyId);
      return player.isMemberOf(company);
    }

    return false;
  },
  companyInventoryView: function() {
    var view = new InventoryView({
      sourceInventory: Inventory.getByCompany(Company.getCurrent())
    });

    view.addGroup(new InventoryColumn({
      title: 'Primary Weapons',
      policy: function(itemWrapper) {
        return itemWrapper.item.hasTags(['rifle', 'assault-rifle', 'sniper-rifle', 'smg', 'lmg', 'mmg']);
      },
      sort: function(itemWrapperA, itemWrapperB) {
        var nameA = itemWrapperB.item.name.toLowerCase();
        var nameB = itemWrapperA.item.name.toLowerCase();

        return nameB.localeCompare(nameA);
      }
    }));

    view.addGroup(new InventoryColumn({
      title: 'Seconday Weapons',
      policy: function(itemWrapper) {
        return itemWrapper.item.hasTags(['law', 'rpg', 'grenade-launcher', 'grenade', 'handgun']);
      },
      sort: function(itemWrapperA, itemWrapperB) {
        var nameA = itemWrapperB.item.name.toLowerCase();
        var nameB = itemWrapperA.item.name.toLowerCase();

        return nameB.localeCompare(nameA);
      }
    }));

    view.addGroup(new InventoryColumn({
      title: 'Gear & Sights',
      policy: function(itemWrapper) {
        return itemWrapper.item.hasTags(['helmet', 'tactical-vest', 'backpack', 'binoculars', 'scope', 'sight']);
      },
      sort: function(itemWrapperA, itemWrapperB) {
        var nameA = itemWrapperB.item.name.toLowerCase();
        var nameB = itemWrapperA.item.name.toLowerCase();

        return nameB.localeCompare(nameA);
      }
    }));

    view.addGroup(new InventoryColumn({
      title: 'Vehicles',
      policy: function(itemWrapper) {
        return itemWrapper.item.hasTags(['vehicle']);
      },
      sort: function(itemWrapperA, itemWrapperB) {
        var nameA = itemWrapperB.item.name.toLowerCase();
        var nameB = itemWrapperA.item.name.toLowerCase();

        return nameB.localeCompare(nameA);
      }
    }));

    view.refresh();

    return view;
  }
});

Template.companies_status.events({
  'click .js-rename-company': function(event, template) {
    var newName = prompt('New name?', Company.getCurrent().getName());
    Meteor.call(
      'renameCurrentCompany',
      newName,
      function (error, result) {
        if (error) {
          alert(error)
        }
      }
    );
  },
  'click .js-leave-company': function(event, template) {
    if (confirm('Are you sure? (If last player leaves, company is deleted)')) {
      var player = Player.getCurrent();
      var company = player.getCompany();

      Meteor.call(
        'leaveCompany',
        function (error, result) {
          if (error) {
            alert(error)
          }
        }
      );
    }
  }
});

