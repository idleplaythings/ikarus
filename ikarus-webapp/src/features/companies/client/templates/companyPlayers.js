Template.company_manage_players.events({
  'click .js-promote': function (event, template) {
    var player = Player.getCurrent();
    var company = Company.getCurrent();

    var playerId = jQuery(event.target).attr("data-playerId");
    var target = Player.getByMeteorId(playerId);

    if (! player || ! company || ! target) {
      return;
    }

    Meteor.call(
      'promoteMember',
      target._id,
      function (error, result) {
        if (error) {
          alert(error)
        }
      }
    );
  },

  'click .js-demote': function (event, template) {
    var player = Player.getCurrent();
    var company = Company.getCurrent();

    var playerId = jQuery(event.target).attr("data-playerId");
    var target = Player.getByMeteorId(playerId);

    if (! player || ! company || ! target) {
      return;
    }

    Meteor.call(
      'demoteMember',
      target._id,
      function (error, result) {
        if (error) {
          alert(error)
        }
      }
    );
  },

  'click .js-remove': function (event, template) {
    var player = Player.getCurrent();
    var company = Company.getCurrent();

    var playerId = jQuery(event.target).attr("data-playerId");
    var target = Player.getByMeteorId(playerId);

    if (! player || ! company || ! target) {
      return;
    }

    if (confirm('Are you sure you want to remove ' + target.getName() + "?")) {
      Meteor.call(
        'removeMember',
        target._id,
        function (error, result) {
          if (error) {
            alert(error)
          }
        }
      );
    }
  },

  'click .js-make-owner': function (event, template) {
    var player = Player.getCurrent();
    var company = Company.getCurrent();

    var playerId = jQuery(event.target).attr("data-playerId");
    var target = Player.getByMeteorId(playerId);

    if (! player || ! company || ! target) {
      return;
    }

    if (confirm('Are you sure you want to make ' + target.getName() + " the new owner of the company?")) {
      Meteor.call(
        'makeOwner',
        target._id,
        function (error, result) {
          if (error) {
            alert(error)
          }
        }
      );
    }
  },
});