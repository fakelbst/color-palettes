'use strict';

var a = new Vue({
  el: '#app',
  data: {
    colorCount: 5,
    colors: []
  },
  ready: function ready() {
    var _this = this;

    var image = new Image();
    image.src = 'demo.jpg';
    image.onload = function () {
      var colorPalette = new ColorPalettes(image);
      colorPalette.getPalettes({
        colorCount: _this.colorCount,
        format: 'hex'
      }).then(function (r) {
        _this.colors = r;
      });
    };
  }
});

a.$watch('colorCount', function () {
  var colorPalette = new ColorPalettes('demo.jpg');
  colorPalette.getPalettes({
    colorCount: this.colorCount,
    format: 'hex'
  }).then(function (r) {
    a.colors = r;
  });
}, {});

var figure = document.querySelectorAll('.grid figure');

figure.forEach(function (item) {
  new ColorPalettes(item.childNodes[1]).dominantThree({
    format: 'hex'
  }).then(function (result) {
    item.style.background = '#' + result[0];
    item.childNodes[3].childNodes[1].style.color = '#' + result[1];
    item.childNodes[3].childNodes[3].style.color = '#' + result[2];
  });
});
