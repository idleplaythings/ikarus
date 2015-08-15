Template.itemDescription.helpers({
  description: function () {
    var entry = ItemDescriptions[this.armaClass];
    if (! entry) {
      return "no description";
    }

    return entry.description;
  },

  pros: function () {
    return getPros(this.armaClass);
  },

  cons: function () {
    return getCons(this.armaClass);
  },

  mod: function () {
    return getMod(this.armaClass);
  },
});

function getPros(armaClass) {
  return ItemDescriptions[armaClass] ? ItemDescriptions[armaClass].pros : null;
}

function getCons(armaClass) {
  return ItemDescriptions[armaClass] ? ItemDescriptions[armaClass].cons : null;
}

function getMod(armaClass) {
  return ItemDescriptions[armaClass] ? ItemDescriptions[armaClass].mod : null;
}