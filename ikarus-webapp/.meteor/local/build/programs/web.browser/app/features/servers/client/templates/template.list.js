(function(){
Template.__checkName("servers_list");
Template["servers_list"] = new Template("Template.servers_list", (function() {
  var view = this;
  return HTML.DIV(HTML.Raw("\n    <h2>Servers</h2>\n\n    "), Blaze.If(function() {
    return Spacebars.call(view.lookup("debug"));
  }, function() {
    return [ "\n      ", HTML.DIV("\n        ", HTML.INPUT({
      name: "server-name"
    }), " ", HTML.BUTTON({
      "class": "js-server-register"
    }, "Register server"), "\n      "), "\n    " ];
  }), "\n\n    ", HTML.TABLE("\n      ", HTML.THEAD("\n        ", HTML.TR("\n          ", HTML.TH("Name"), "\n          ", HTML.TH("Status"), "\n          ", HTML.TH("Players"), "\n          ", Blaze.If(function() {
    return Spacebars.call(view.lookup("debug"));
  }, function() {
    return [ "\n            ", HTML.TH("Debug"), "\n          " ];
  }), "\n        "), "\n      "), "\n      ", HTML.TBODY("\n        ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("servers"));
  }, function() {
    return [ "\n          ", HTML.TR("\n            ", HTML.TD(Blaze.View(function() {
      return Spacebars.mustache(view.lookup("name"));
    })), "\n            ", HTML.TD(Blaze.View(function() {
      return Spacebars.mustache(view.lookup("status"));
    })), "\n            ", HTML.TD(Blaze.View(function() {
      return Spacebars.mustache(view.lookup("playerCount"));
    })), "\n            ", Blaze.If(function() {
      return Spacebars.call(view.lookup("debug"));
    }, function() {
      return [ "\n              ", HTML.TD("\n                ", HTML.BUTTON({
        "data-server-name": function() {
          return Spacebars.mustache(view.lookup("name"));
        },
        "class": "js-server-connect"
      }, "Connect"), "\n                ", HTML.BUTTON({
        "data-server-name": function() {
          return Spacebars.mustache(view.lookup("name"));
        },
        "class": "js-server-disconnect"
      }, "Disconnect"), "\n              "), "\n            " ];
    }), "\n          "), "\n        " ];
  }, function() {
    return [ "\n          ", HTML.TR("\n            ", HTML.TD({
      colspan: "4"
    }, "No servers found."), "\n          "), "\n        " ];
  }), "\n      "), "\n    "), "\n  ");
}));

})();
