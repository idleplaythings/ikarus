Template.queue_status.onCreated(function() {
  this.subscribe('Servers');
});

Template.queue_status.helpers({
  numberOfSquads: function() {
    var queue = ServerQueue.getByRegion('EU');

    if (! queue) {
      return 0;
    }

    return queue.getLength();
  }
});