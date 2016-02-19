Template.marketplace.helpers({
  marketContext: function () {
    var category = Session.get('selectedMarketCategory') || 'AR';
    return new MarketContext(category, dic.get('ItemFactory'));
  },

  categoryActivityClass: function () {
    return this._id === (Session.get('selectedMarketCategory') || 'AR') ? 'active' : '';
  },

  categories: function () {
    return marketDefinitions;
  }
});

Template.marketplace.events({
  'click button.marketCategory': function (event, template) {
    var $elem = jQuery(event.target);
    var value = event.target.attributes.getNamedItem('data-marketCategory').value;
    Session.set('selectedMarketCategory', value);
  }
});