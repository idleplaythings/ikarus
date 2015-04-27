Template.itemImage.helpers({
  image: function () {
    dependency.depend();

    if (items.length === 0) {
      return "/missing-item.png";
    }

    var image = getImage(this.armaClass);

    if (! image) {
      return "/missing-item.png";
    }

    return "/items/" + image.img;
  }
});

function getImage(armaClass) {
  return items.filter(function(item) {
    return item.armaClass === armaClass;
  }).pop();
}

var dependency = new Tracker.Dependency();
var items = [];

jQuery.getJSON('/items.json').then(function(loadedItems) {
  dependency.changed();
  items = loadedItems;
  return;

  var showItem = function (event, template) {

    var $elem = jQuery(event.target);
    var armaClass = event.target.attributes.getNamedItem('data-armaclass').value;

    var matches = items.filter(function(item) { return item.armaClass === armaClass; });
    if (matches.length < 1) {
      console.log('missing item ' + armaClass);
      $elem.find('img').remove();
      $elem.prepend('<img class="item-image" src="/missing-item.png">');
      return;
    }

    $elem.find('img').remove();
    $elem.prepend('<img class="item-image" src="/items/' + matches[0].img + '">');
  };
  var hideItem = function (event, template) {
    var $target = jQuery(event.target);

    if (!$target.is('img')) {
      $target = $target.find('img');
    }

    $target.remove();
  };

  Template.inventory.events({
    'mouseenter .inventory-entry': showItem,
    'mouseleave .inventory-entry': hideItem,
    'mouseenter .inventory-entry img': hideItem
  });
});