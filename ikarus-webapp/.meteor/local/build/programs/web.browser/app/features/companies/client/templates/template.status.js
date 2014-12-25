(function(){
Template.__checkName("companies_status");
Template["companies_status"] = new Template("Template.companies_status", (function() {
  var view = this;
  return HTML.DIV("\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("company"));
  }, function() {
    return [ "\n      ", HTML.H2(Blaze.View(function() {
      return Spacebars.mustache(view.lookup("companyName"));
    })), "\n\n      ", HTML.BUTTON({
      "class": "js-rename-company"
    }, "Rename"), "\n      ", HTML.BUTTON({
      "class": "js-leave-company"
    }, "Leave"), "\n      ", HTML.BUTTON({
      "class": "js-invite-to-company"
    }, "Invite"), "\n\n      ", HTML.DIV({
      "class": "container-fluid"
    }, "\n        ", HTML.DIV({
      "class": "row"
    }, "\n          ", HTML.DIV({
      "class": "col-md-6"
    }, "\n            ", HTML.H3("Players"), "\n            ", Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("company"));
    }, function() {
      return Spacebars.include(view.lookupTemplate("players_list"));
    }), "\n          "), "\n          ", HTML.DIV({
      "class": "col-md-6"
    }, "\n            ", Blaze.Unless(function() {
      return Spacebars.call(view.lookup("squad"));
    }, function() {
      return [ "\n              ", HTML.H3("Armory"), "\n              ", Spacebars.With(function() {
        return Spacebars.call(view.lookup("company"));
      }, function() {
        return [ "\n                ", Spacebars.include(view.lookupTemplate("armory")), "\n              " ];
      }), "\n            " ];
    }), "\n          "), "\n        "), "\n      "), "\n    " ];
  }, function() {
    return [ "\n      ", HTML.H2("Company"), "\n\n      ", HTML.P("You are not a member of a company. Create new one..."), "\n\n      ", HTML.P("\n        ", HTML.LABEL("Name for your company:"), "\n        ", HTML.INPUT({
      "class": "js-company-name",
      type: "text"
    }), "\n        ", HTML.BUTTON({
      "class": "js-create-company"
    }, "Create new company"), "\n      "), "\n\n      ", Blaze.If(function() {
      return Spacebars.call(view.lookup("invites"));
    }, function() {
      return [ "\n        ", HTML.P("or join one of these companies:"), "\n        ", Blaze.Each(function() {
        return Spacebars.call(view.lookup("invites"));
      }, function() {
        return [ "\n          ", HTML.BUTTON({
          "class": "js-join-company",
          "data-companyid": function() {
            return Spacebars.mustache(view.lookup("companyId"));
          }
        }, '\n            Join company "', Blaze.View(function() {
          return Spacebars.mustache(view.lookup("name"));
        }), '"\n          '), "\n        " ];
      }), "\n      " ];
    }, function() {
      return [ "\n        ", HTML.P("... or ask your friends for an invite!"), "\n      " ];
    }), "\n    " ];
  }), "\n  ");
}));

})();
