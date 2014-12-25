(function(){
Template.__checkName("home");
Template["home"] = new Template("Template.home", (function() {
  var view = this;
  return HTML.DIV({
    "class": "ikarus-main container-fluid"
  }, "\n    ", HTML.DIV({
    "class": "row"
  }, "\n      ", HTML.Raw('<div class="col-md-4">\n        <h1>Ikarus</h1>\n\n        <p>Download mod from: <a href="https://s3-eu-west-1.amazonaws.com/ikarus.idleplaythings.com/mod/%40ikrs_v0.1.1.zip">here </a></p>\n      </div>'), "\n\n      ", HTML.DIV({
    "class": "col-md-8"
  }, "\n        ", HTML.DIV({
    "class": "pull-right"
  }, "\n          ", Spacebars.include(view.lookupTemplate("loginButtons")), "\n        "), "\n      "), "\n    "), "\n\n    ", HTML.DIV({
    "class": "row"
  }, "\n      ", HTML.DIV({
    "class": "col-md-6"
  }, "\n        ", Spacebars.include(view.lookupTemplate("servers_list")), "\n      "), "\n      ", HTML.DIV({
    "class": "col-md-6"
  }, "\n        ", Spacebars.include(view.lookupTemplate("companies_list")), "\n      "), "\n    "), "\n\n    ", HTML.DIV({
    "class": "row"
  }, "\n      ", HTML.DIV({
    "class": "col-md-12"
  }, "\n        ", Spacebars.include(view.lookupTemplate("players_status")), "\n      "), "\n    "), "\n\n    ", HTML.DIV({
    "class": "row"
  }, "\n      ", HTML.DIV({
    "class": "col-md-12"
  }, "\n        ", Spacebars.include(view.lookupTemplate("companies_status")), "\n      "), "\n    "), "\n\n    ", HTML.DIV({
    "class": "row"
  }, "\n      ", HTML.DIV({
    "class": "col-md-12"
  }, "\n        ", Spacebars.include(view.lookupTemplate("squads_status")), "\n      "), "\n    "), "\n  ");
}));

})();
