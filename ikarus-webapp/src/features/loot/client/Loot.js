Loot = function Loot(itemsAndChange) {
  this.itemsAndChange = itemsAndChange;
}

Loot.createFromArray = function (array) {

  var itemsAndChange = array.map(function (entry) {
    var items = null;
    var armaClass = entry[0];
    var dice = entry[1];
    var add = entry[2];

    var change = '';

    if (dice == 1) {
      change = (1+add) + '';
    } else {
      change = 'd' + dice;
      if (add < 0) {
        change +=add;
      } else if (add > 0) {
        change += '+' + add;
      }
    }

    if (armaClass instanceof Array) {
      items = armaClass.reduce( function (list, entry) {
        return list.concat(Loot.getItems(entry));
      }, []);
    } else {
      items = Loot.getItems(armaClass);
    }

    if (items instanceof Item) {
      items = [items];
    }

    return {
      items: items,
      change: change
    }
  }).filter(function (itemsAndChange) {
    if (itemsAndChange.items instanceof Array && itemsAndChange.items[0]) {
      return true;
    }

    return false;
  });


  return new Loot(itemsAndChange);
};

Loot.getItems = function (name) {

  if (name instanceof Array) {
    return name.map(Loot.getItems);
  }

  var itemFactory = dic.get('ItemFactory');
  var item = itemFactory.createItemByArmaClass(name);

  if (item) {
    return item;
  }

  var lootTableEntry = lootTable_setDefinitions.filter(function (set) {
    return set[0] == name;
  }).pop();

  if (lootTableEntry) {
    return Loot.getItems(lootTableEntry[1]);
  }
};

Loot.createFromItem = function (item) {
  if (item.loot) {
    return Loot.createFromLootItem(item);
  }
};

Loot.createFromLootItem = function (item) {
  var itemFactory = dic.get('ItemFactory');

  var itemsAndChange = Object.keys(item.loot).map( function (armaClass) {
    var payload = item.loot[armaClass];
    var items = [];
    var change = "";

    if (payload.selectFrom) {
      items = payload.selectFrom.map(itemFactory.createItemByArmaClass.bind(itemFactory));
      change = payload.change;
    } else {
      items = [itemFactory.createItemByArmaClass(armaClass)];
      change = payload;
    }

    return {
      items: items,
      change: change
    }
  });

  return new Loot(itemsAndChange);
};