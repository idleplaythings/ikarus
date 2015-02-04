Template.queue_status.created = function() {
  Meteor.subscribe('Servers');
};

Template.queue_status.helpers({
  numberOfSquads: function() {
    var queue = ServerQueue.getByRegion('EU');

    if (! queue) {
      return 0;
    }

    return queue.getLength();
  }
});