var a = new Vue({
  el: '#app',
  data: {
    colorCount: 5,
    colors: []
  },
  ready: function() {
    var that = this;
    var image = new Image();
    image.src = 'demo.jpg';
    image.onload = function() {
      var colorPalette = new ColorPalettes(image);
      colorPalette.getPalettes({
        colorCount: that.colorCount,
        format: 'hex'
      }).then( function(r){
        that.colors = r;
      });
    };
  }
});

a.$watch('colorCount', function() {
  var colorPalette = new ColorPalettes('demo.jpg');
  colorPalette.getPalettes({
    colorCount: a.colorCount,
    format: 'hex'
  }).then(function (r) {
    a.colors = r;
  });
}, {});

var figure = document.querySelectorAll('.grid figure');

imagesLoaded(figure, function(){
  figure.forEach( function(item){
    new ColorPalettes(item.childNodes[1]).dominantThree({
      format: 'hex'
    }).then((result) => {
      item.style.background = '#' + result[0];
      item.childNodes[3].childNodes[1].style.color = '#' + result[1];
      item.childNodes[3].childNodes[3].style.color = '#' + result[2];
    });
  });
});

