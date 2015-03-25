Template.base_location.created = function(){
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

function drawOverlay($map) {
  var template = this;
  var canvas = template.find('canvas.overlay');
  var ctx = canvas.getContext('2d');

  var player = Player.getCurrent();

  if (! player) {
    return;
  }

  var company = Company.getByPlayer(player);

  if (! company) {
    return;
  }

  var position = company.getHideout();
  canvas.width = $map.width();
  canvas.height = $map.height();

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(
      position.x / 30000 * canvas.width,
      canvas.height - (position.y - 1000) / 27000 * canvas.height,
      10,
      0,
      Math.PI*2,
      true
  );
  ctx.stroke();
}

Template.base_location.rendered = function(){
  var $map = jQuery(this.find('img.map'));
  Tracker.autorun(drawOverlay.bind(this, $map));
  $map.load(drawOverlay.bind(this, $map));
  jQuery(window).resize(_.debounce(drawOverlay.bind(this, $map), 50));
};

Template.base_location.events({
  'click .map': function(event, template){
    var map = jQuery(template.find('img.map'));

    var position = {
        x: (event.pageX - map.offset().left) / map.width() * 30000,
        y: (map.height() - (event.pageY - map.offset().top)) / map.height() * 27000 + 1000
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
