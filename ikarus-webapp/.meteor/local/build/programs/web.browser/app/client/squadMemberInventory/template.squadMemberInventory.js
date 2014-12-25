(function(){
Template.__checkName("squadMemberInventory");
Template["squadMemberInventory"] = new Template("Template.squadMemberInventory", (function() {
  var view = this;
  return [ HTML.Raw("<h3>Inventory</h3>\n\n\n  "), Blaze.Each(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("getInventory"), "getOtherThanMagazines"));
  }, function() {
    return [ "\n    ", HTML.DIV({
      "class": "panel panel-default"
    }, "\n      ", HTML.DIV({
      "class": "panel-heading"
    }, "\n        ", Spacebars.include(view.lookupTemplate("squadMemberInventory_itemEntry")), "\n\n      "), "\n      ", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("getAmmo"), view.lookup("item"));
    }, function() {
      return [ "\n        ", HTML.DIV({
        "class": "panel-body"
      }, "\n          ", Spacebars.include(view.lookupTemplate("squadMemberInventory_ammoEntry")), "\n        "), "\n      " ];
    }), "\n    "), "\n  " ];
  }) ];
}));

Template.__checkName("squadMemberInventory_ammoEntry");
Template["squadMemberInventory_ammoEntry"] = new Template("Template.squadMemberInventory_ammoEntry", (function() {
  var view = this;
  return HTML.DIV({
    "class": "row inventory-entry member-inventory"
  }, "\n    ", Blaze.Each(function() {
    return Spacebars.dataMustache(view.lookup("getAmmo"), view.lookup("item"));
  }, function() {
    return [ "\n      ", Blaze.Unless(function() {
      return Spacebars.call(view.lookup("locked"));
    }, function() {
      return [ "\n        ", HTML.DIV({
        "class": "col-md-1 clickable remove-from-inventory glyphicon glyphicon-minus",
        "data-armaclass": function() {
          return Spacebars.mustache(view.lookup("armaClass"));
        }
      }), "\n\n        ", HTML.DIV({
        "class": "col-md-1 clickable add-to-inventory glyphicon glyphicon-plus",
        "data-armaclass": function() {
          return Spacebars.mustache(view.lookup("armaClass"));
        }
      }), "\n      " ];
    }), "\n      ", HTML.DIV({
      "class": "col-md-6"
    }, "\n        ", Blaze.View(function() {
      return Spacebars.mustache(view.lookup("name"));
    }), "\n      "), "\n      ", HTML.DIV({
      "class": "col-md-2 pull-right"
    }, "\n        ", Blaze.View(function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("getInventory"), "getCountByClass"), view.lookup("armaClass"));
    }), "\n      "), "\n    " ];
  }), "\n  ");
}));

Template.__checkName("squadMemberInventory_itemEntry");
Template["squadMemberInventory_itemEntry"] = new Template("Template.squadMemberInventory_itemEntry", (function() {
  var view = this;
  return HTML.DIV({
    "class": "row inventory-entry member-inventory",
    "data-armaclass": function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("item"), "armaClass"));
    }
  }, "\n    ", Blaze.Unless(function() {
    return Spacebars.call(view.lookup("locked"));
  }, function() {
    return [ "\n      ", HTML.DIV({
      "class": "col-md-1 clickable remove-from-inventory glyphicon glyphicon-minus",
      "data-armaclass": function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("item"), "armaClass"));
      }
    }), "\n\n      ", HTML.DIV({
      "class": "col-md-1 clickable add-to-inventory glyphicon glyphicon-plus",
      "data-armaclass": function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("item"), "armaClass"));
      }
    }), "\n    " ];
  }), "\n    ", HTML.DIV({
    "class": "col-md-6"
  }, "\n      ", HTML.H3({
    "class": "panel-title"
  }, Blaze.View(function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("item"), "name"));
  })), "\n    "), "\n    ", HTML.DIV({
    "class": "col-md-2 pull-right"
  }, "\n      ", Blaze.View(function() {
    return Spacebars.mustache(view.lookup("getCount"));
  }), "\n    "), "\n  ");
}));

})();
