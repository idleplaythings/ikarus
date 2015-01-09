Template.home.created = function(){
  Meteor.subscribe('MySquad');
  Meteor.subscribe('Servers');
};

Template.home.helpers({
  company: function() {
    return Player.getCurrent().getCompany();
  },
  squad: function() {
    return Player.getCurrent().getSquad();
  }
});

Template.home.events({
  'click .add-to-inventory': function(event, template){
    var armaClass = jQuery(event.target).attr("data-armaclass");
    console.log("add", armaClass);
    Meteor.call(
      'addToInventory',
      armaClass,
      function (error, result){}
    );
  },
  'click .js-reset': function() {
    Meteor.call('testing_removeFixtures');
    Meteor.call('testing_createDataSet');
  }
})

