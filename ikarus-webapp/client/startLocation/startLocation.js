Template.startLocation.events({
  'click #altis-map': function(event, template){
    var element = template.find('#altis-map');
    var x, y;
    x = event.pageX;
    y = event.pageY;

    x -= element.offsetLeft;
    y -= element.offsetTop;

    console.log(x, y);

    Meteor.call('changeStartingLocation', this._id, {x:x, y:y});
  }
});