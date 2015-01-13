Template.company_hideout.created = function(){
  Tracker.autorun(function(){
    var player = Player.getCurrent();

    if (! player){
      return;
    }

    var company = Company.getByPlayer(player);

    if (! company){
      return;
    }

    Meteor.subscribe('MyCompany', company._id);
  });
};

Template.company_hideout.events({
  'click #altis-map': function(event, template){
    var element = jQuery(template.find('#altis-map'));

    var position = {
        x: (event.pageX - element.offset().left) / element.width() * 30000,
        y: (element.height() - (event.pageY - element.offset().top)) / element.height() * 27000 + 1000
    };

    Meteor.call(
      'changeHideoutLocation',
      position,
      function (error, result) {
        if (error) {
          alert(error)
        }
      }
    );
  }
});
