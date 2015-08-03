Template.combat_report.helpers({
  hasCombatLog: function() {
    return this instanceof CombatLog;
  },

  getEventHeader: function (combatLog) {
    var time = moment(this.time).format("H:mm:ss");
    return time + " " + this.header;
  },

  parseXml: function (text) {
    var js = jQuery.parseXML(text);

    parsePlayers(js);
    parseEquipment(js);


    var html = jQuery('text', js).html();
    return Spacebars.SafeString(html);
  },

  gainedOrLostClass: function (amount) {
    return amount < 0 ? "lost" : "gained";
  }
});


function parsePlayers (xmlObject) {
  jQuery('player', xmlObject).replaceWith(function () {
    var element = jQuery(this);
    var name = element.html();
    var uid = element.attr('uid');

    var a = jQuery('<a href=""></a>');
    a.attr('href', '/players/'+uid);
    a.text(name);

    return a;
  });
}

function parseEquipment (xmlObject) {
  jQuery('item', xmlObject).replaceWith(function () {
    var element = jQuery(this);
    var name = element.html();
    var armaClass = element.attr('armaClass');

    var span = jQuery('<span></span>');
    span.attr('data-armaclass', armaClass);
    span.text(name);
    span.addClass('show-item-tooltip-small');

    return span;
  });
}