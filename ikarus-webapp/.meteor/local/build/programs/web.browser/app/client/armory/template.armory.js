(function(){
Template.__checkName("armory");
Template["armory"] = new Template("Template.armory", (function() {
  var view = this;
  return Blaze.Each(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("getInventory"), "getOtherThanMagazines"));
  }, function() {
    return [ "\n\n  ", HTML.DIV({
      "class": "panel panel-default",
      style: "margin-bottom:0px;"
    }, "\n    ", HTML.DIV({
      "class": "panel-heading"
    }, "\n      ", HTML.DIV({
      "class": "row inventory-entry armory",
      "data-armaclass": function() {
        return Spacebars.mustache(view.lookup("armaClass"));
      }
    }, "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("squad"));
    }, function() {
      return [ "\n          ", HTML.DIV({
        "class": "col-md-1 clickable add-to-inventory glyphicon glyphicon-plus",
        "data-armaclass": function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("item"), "armaClass"));
        }
      }, "\n\n          "), "\n        " ];
    }), "\n        ", HTML.DIV({
      "class": "col-md-5"
    }, "\n          ", Blaze.View(function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("item"), "name"));
    }), "\n        "), "\n        ", HTML.DIV({
      "class": "col-md-3"
    }, "\n          ", Blaze.If(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("item"), "isWeapon"));
    }, function() {
      return [ "\n            ", HTML.SPAN({
        "class": "glyphicon glyphicon-pencil"
      }), " ", Blaze.View(function() {
        return Spacebars.mustache(view.lookup("ammo"));
      }), "\n          " ];
    }), "\n        "), "\n        ", HTML.DIV({
      "class": "col-md-2 pull-right"
    }, "\n          ", HTML.SPAN({
      "class": "glyphicon glyphicon-align-justify"
    }), " ", Blaze.View(function() {
      return Spacebars.mustache(view.lookup("getCount"));
    }), "\n        "), "\n      "), "\n    "), "\n  "), "\n  " ];
  });
}));

})();
