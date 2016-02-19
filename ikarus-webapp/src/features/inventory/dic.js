dic.register('ItemFactory', function (dic) {
  return new ItemFactory(
    ItemDefinitions
  );
}, {shared: true});

dic.register('InventoryFactory', function (dic) {
  return new InventoryFactory(
    dic.get('ItemFactory')
  );
}, {shared: true});

dic.register('AlphabeticalInventoryColumnSort', function(div) {
  return function(itemWrapperA, itemWrapperB) {
    var nameA = itemWrapperB.item.name.toLowerCase();
    var nameB = itemWrapperA.item.name.toLowerCase();

    return nameB.localeCompare(nameA);
  };
});

dic.register('PrimaryWeaponInventoryColumn', function(dic) {
  return new InventoryColumn({
    title: 'Primary Weapons',
    policy: function(itemWrapper) {
      return itemWrapper.item.hasSomeTags([
        'rifle',
        'assault-rifle',
        'sniper-rifle',
        'smg',
        'lmg',
        'mmg'
      ]);
    },
    sort: dic.get('AlphabeticalInventoryColumnSort')
  });
});

dic.register('SecondaryWeaponInventoryColumn', function(dic) {
  return new InventoryColumn({
    title: 'Secondary Weapons',
    policy: function(itemWrapper) {
      return itemWrapper.item.hasSomeTags([
        'law',
        'rpg',
        'grenade-launcher',
        'grenade',
        'handgun',
        'static weapon'
      ]);
    },
    sort: dic.get('AlphabeticalInventoryColumnSort')
  });
});

dic.register('GearAndSightsInventoryColumn', function(dic) {
  return new InventoryColumn({
    title: 'Gear & Sights',
    policy: function(itemWrapper) {
      return itemWrapper.item.hasSomeTags([
        'helmet',
        'tactical-vest',
        'backpack',
        'binoculars',
        'scope',
        'sight'
      ]);
    },
    sort: dic.get('AlphabeticalInventoryColumnSort')
  });
});

dic.register('ResourcesAndSpecialEquipmentInventoryColumn', function(dic) {
  return new InventoryColumn({
    title: 'Vehicles and Resources',
    policy: function(itemWrapper) {
      return itemWrapper.item.hasSomeTags([
        'resource',
        'vehicle',
        'helicopter'
      ]);
    },
    sort: dic.get('AlphabeticalInventoryColumnSort')
  });
});

dic.register('VehiclesInventoryColumn', function(dic) {
  return new InventoryColumn({
    title: 'Vehicles and mission resources',
    policy: function(itemWrapper) {
      return itemWrapper.item.hasSomeTags([
        'vehicle',
        'missionkey',
        'helicopter'
      ]);
    },
    sort: dic.get('AlphabeticalInventoryColumnSort')
  });
});

dic.register('SquadInventoryView', function(dic) {
  var squad = Squad.getCurrent();
  var squadInventoryView = new InventoryView({
    sourceInventory: Inventory.getByCompany(Company.getCurrent()),
    targetInventory: Inventory.getBySquad(squad)
  });

  squadInventoryView.vehicleSlots = 1;
  squadInventoryView.armorSlots = 1;
  squadInventoryView.heloSlots = 1;
  squadInventoryView.staticWeaponSlots = 1;

  squadInventoryView.addGroup(dic.get('PrimaryWeaponInventoryColumn'));
  squadInventoryView.addGroup(dic.get('SecondaryWeaponInventoryColumn'));
  squadInventoryView.addGroup(dic.get('GearAndSightsInventoryColumn'));
  squadInventoryView.addGroup(dic.get('VehiclesInventoryColumn'));

  return squadInventoryView;
});

dic.register('CompanyInventoryView', function(dic) {
  var companyInventoryView = new InventoryView({
    sourceInventory: Inventory.getByCompany(Company.getCurrent())
  });

  companyInventoryView.addGroup(dic.get('PrimaryWeaponInventoryColumn'));
  companyInventoryView.addGroup(dic.get('SecondaryWeaponInventoryColumn'));
  companyInventoryView.addGroup(dic.get('GearAndSightsInventoryColumn'));
  companyInventoryView.addGroup(dic.get('ResourcesAndSpecialEquipmentInventoryColumn'));

  return companyInventoryView;
});
