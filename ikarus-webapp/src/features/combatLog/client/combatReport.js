Template.combat_report.helpers({
  hasCombatLog: function() {
    return this instanceof CombatLog;
  },

  getEventHeader: function (combatLog) {
    var time = moment(this.time).format("H:mm:ss");
    return time + " " + this.header;
  },

  parseXml: function (text) {
    var js = jQuery.parseXML(text);

    parsePlayers(js);
    parseEquipment(js);
    parseCompanies(js);


    var html = jQuery('text', js).html();
    return Spacebars.SafeString(html);
  },

  getItems: getItems
});

Template.combatLog_LootEntry.helpers({
  gainedOrLostClass: function (amount) {
    return amount < 0 ? "lost" : "gained";
  },

  collectionClass: function (parentItem) {
    return parentItem ? "add-left" : "";
  }
});


function getItems () {

  var lootEntries = this.loot.collections.map(createLootEntry);
  lootEntries.unshift(createLootEntry(this.loot));
  calculateTotals(lootEntries, this.equipment);

  return lootEntries.filter(function (entry) {
    entry.items = entry.items.filter(function (item) {
      console.log(item);
      return ! item.item.unlimited && item.total !== 0;
    });

    return entry.items.length > 0;
  });
};

function setLootBalance (lootEntries, armaClass, taken) {
  var found = false;

  lootEntries.forEach(function (lootEntry) {
    lootEntry.items.map(function (entry) {
      var itemClass = entry.item.armaClass;

      var gained = calculateItemAmount(lootEntries, itemClass);

      if (itemClass !== armaClass && entry.total === null) {
        entry.total = gained;
      }

      if (itemClass === armaClass) {
        entry.total = gained - taken;
        found = true;
      }
      return entry;
    });
  });

  return found;
};

function calculateTotals (lootEntries, equipment) {

  Object.keys(equipment).forEach(function(armaClass){
    var taken = equipment[armaClass];

    var found = setLootBalance(lootEntries, armaClass, taken);

    if (! found) {
      lootEntries[0].items.push({
        item: dic.get('ItemFactory').createItemByArmaClass(armaClass),
        amount: 0,
        total: -taken
      });
    }
  });

  //make sure totals are set even if we had empty equipment object
  setLootBalance(lootEntries);

};

function calculateItemAmount(lootEntries, itemClass) {
  var amount = 0;

  lootEntries.forEach(function (lootEntry) {
    lootEntry.items.forEach(function (entry) {
      if (entry.item.armaClass == itemClass) {
        amount += entry.amount;
      }
    });
  });

  return amount;
};

function createLootEntry(payload) {
  var blackList = [
    //'IKRS_renown'
  ];

  var parentItem = payload.parentItem ? dic.get('ItemFactory').createItemByArmaClass(payload.parentItem) : null;
  var items = Object.keys(payload.items).map(function(armaClass) {
    return {
      item: dic.get('ItemFactory').createItemByArmaClass(armaClass),
      amount: payload.items[armaClass],
      total: null
    };
  }).filter(function (entry) {
    return blackList.indexOf(entry.item.armaClass) === -1;
  });

  return {
    parentItem: parentItem,
    items: items
  };
};

function parseCompanies (xmlObject) {
  jQuery('company', xmlObject).replaceWith(function () {
    var element = jQuery(this);
    var name = element.html();
    var id = element.attr('id');

    var a = jQuery('<a href=""></a>');
    a.attr('href', '/companies/'+id);
    a.text(name);

    return a;
  });
}

function parsePlayers (xmlObject) {
  jQuery('player', xmlObject).replaceWith(function () {
    var element = jQuery(this);
    var name = element.html();
    var uid = element.attr('uid');

    var a = jQuery('<a href=""></a>');
    a.attr('href', '/players/'+uid);
    a.text(name);

    return a;
  });
}

function parseEquipment (xmlObject) {
  jQuery('item', xmlObject).replaceWith(function () {
    var element = jQuery(this);
    var name = element.html();
    var armaClass = element.attr('armaClass');

    var span = jQuery('<span></span>');
    span.attr('data-armaclass', armaClass);
    span.text(name);
    span.addClass('show-item-tooltip-small');

    return span;
  });
}