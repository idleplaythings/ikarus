Template.itemTooltipSmall.helpers({
  style: function () {
    var element = $(this.parent);
    var offset = element.offset();
    var posY = offset.top - $(window).scrollTop();
    var posX = offset.left - $(window).scrollLeft();

    var horizontal = "left: calc(100% + 10px);";
    var vertical = "top: -2px;";

    if (posX >= $(window).width() / 2) {
      horizontal = "right: calc(100% + 10px);";
    }

    var overY = posY + element.height() - $(window).height();

    if (overY > 0) {
      vertical = "bottom: " + overY + "px";
    } else if (posY >= $(window).height() / 2) {
      vertical = "bottom: -2px;";
    }

    return horizontal+vertical;
  }
});