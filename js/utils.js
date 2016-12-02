$.fn.fadeOut = function() {
  var opacity = this.css('opacity');
  var  interval = setInterval(function() {
    opacity -= 1/200;
    if (opacity <= 0) {
      this.css('display', 'none');
      clearInterval(interval);
      return;
    }
    this.css('opacity', opacity);
  }.bind(this), 1/200);
}

$.fn.fadeIn  = function() {
  var opacity = 0;
  this.css('display', 'block');
  this.css('opacity', opacity);

  var interval = setInterval(function() {
    opacity += 1/200;
    if (opacity >= 1) {
      clearInterval(interval);
      return;
    }
    this.css('opacity', opacity);
  }.bind(this), 1/200);
}

