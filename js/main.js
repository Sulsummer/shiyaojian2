$(document).ready(function() {
  var cursor   = null,
      pages    = [],
      $loading = $('#loading'),
      $$width  = $('body').width(),
      $$height = $('body').height(),
      d        = document;

  var PageSetFuncs = {
    cache: {
      page1: {},
      page2: {},
      page3: {},
      page4: {},
      page5: {}
    },
    set1: function() {
      var $$cache = this.cache.page1,
          $page   = $$cache.$page,
          $female = $$cache.$female,
          $text   = $$cache.$text;

      if (!$page) $page = $$cache.$page = $('#page1');
      if (!$female) $female = $$cache.$female = $page.find('.female');
      if (!$text) $text = $$cache.$text = $page.find('.text');
      /**
       * handle those only once:
       * 1.clouds
       * 2.female
       */
      if (!$$cache.once) {
        (function() {
          $page.find('.clouds').each(function() {
            $(this).height($(this).width()*9/16);
          });

          $female.width($female.height()/2.7);

          $$cache.once = true;
        }.bind(this))();
      }

      /**
       * animate: 1.female
       *          2.text = text1 + text2
       */
      (function() {
        $female.addClass('female-go-in');

        $text.each(function() {
          $(this).addClass('text-go-in');
        });

        setTimeout(function() {
          $page.find('.text2').addClass('text-go-large');
        }, 1000);
      })();



    },
    set2: function() {
      var $$cache = this.cache.page2,
          $page   = $$cache.$page,
          $female = $$cache.$female,
          $text   = $$cache.$text,
          $icons  = $$cache.$icons,
          $cloud  = $$cache.$cloud;

      if (!$page) $page = $$cache.$page = $('#page2');
      if (!$female) $female = $$cache.$female = $page.find('.female');
      if (!$text) $text = $$cache.$text = $page.find('.text');
      if (!$icons) $icons = $$cache.$icons = $page.find('.icon');
      if (!$cloud) $cloud = $$cache.$cloud = $page.find('.cloud');
      /**
       * handle those only once:
       * 1.icons
       * 2.female
       * 3.text
       */
      if (!$$cache.once) {
        (function() {
          var height = $icons.eq(0).width();
          $icons.each(function() {
            $(this).height(height);
          });

          var width = $female.height()/2.5;
          $female.width(width);
          var rightString = $female.css('right'),
              right = parseInt(rightString.slice(0, rightString.indexOf('px')));
          $text.width($page.width() - width - 10 - right);

          $$cache.once = true;
        }.bind(this))();
      }
      /**
       * animate: 1.cloud
       *          2.icons in order
       *          3.female
       *          4.text
       */
      (function() {
        $cloud.addClass('animated bounceInDown');
        $female.addClass('animated slideInUp');
        $text.addClass('animated slideInUp');
        var i = 0, len = $icons.length;
        var interval = setInterval(function() {
          var $icon = $icons.eq(i);
          $icon.css('opacity', '1');
          $icon.offset();
          $icon.addClass('animated bounceInDown');
          i ++;
          if (i === len) clearInterval(interval);
        }, 500);
      })();
    },
    set3: function() {
      var $$cache     = this.cache.page3;
      /**
       * canvas for lights
       */
      (function($$cache) {
        var canvas      = $$cache.canvas || d.getElementById('light'),
            ctx         = $$cache.ctx || canvas.getContext('2d'),
            canHeight   = $$cache.canHeight || $$height*(3/5) ,
            canWidth    = $$cache.canWidth  || $$width,
            LINE_COUNT  = 3,  //  each line equals LINE_COUNT lights's radius*2
            L_COUNT     = 4,  // a canvas contains L_COUNT lights
            r           = $$cache.r || canHeight/(LINE_COUNT*(L_COUNT-1) + L_COUNT)/2,
            x           = $$cache.x || canWidth*(3/10),
            DURATION    = 700,
            DIVIDE_PART = 10,
            DIVIDE_ARC  = Math.PI*2/DIVIDE_PART,
            DIVIDE_LINE = LINE_COUNT*r*2/DIVIDE_PART;

        canvas.setAttribute('width', canWidth);
        canvas.setAttribute('height', canHeight+5); // plus 5 len for avoiding bottom border overlap

        // init the 4 lights
        var i = 0;
        var drawAllInterval = setInterval(function() {
          var y     = (i*LINE_COUNT*2 + i*2 + 1) * r + 2,
              k     = i + 1,
              nextY = (k*LINE_COUNT*2 + k*2 + 1) * r;
          initALight(i, y);
          i ++;
          if (i !== L_COUNT) {
            initALine(i, y, nextY);
          }
          else clearInterval(drawAllInterval);
        }, DURATION);


        // @des   init a light's at its y location
        // @param index start from 0
        function initALight(index, y) {
          var j = 0, lastArc = 0, presentArc  = 0;

          var drawSingleLightInterval = setInterval(function() {
            presentArc = lastArc + DIVIDE_ARC;

            $$drawALight.call(ctx, x, y, r, lastArc, presentArc);

            lastArc = presentArc;

            if (j++ === DIVIDE_PART) {
              clearInterval(drawSingleLightInterval);
              $$drawALightContent.call(ctx, x, y, r*0.9, 0, Math.PI*2);
              $$drawALightText.call(ctx, index, x*1.5, y);
            }
          }, DURATION/DIVIDE_PART);
        }

        function initALine(index, y, nextY) {
          var j = 0, startY = (y + r) , endY = (nextY),
              lastY = startY, presentY = startY;

          var drawSingleLineInterval = setInterval(function() {
            presentY = lastY + DIVIDE_LINE;

            $$drawALine.call(ctx, x, lastY, x, presentY);

            lastY = presentY;

            if (++j === DIVIDE_PART) clearInterval(drawSingleLineInterval);
          }, DURATION/DIVIDE_PART);
        }

        function $$drawALight(x, y, r, lastArc, presentArc) {
          this.beginPath();
          this.arc(x, y, r, lastArc, presentArc, false);
          this.stroke();
        }

        function $$drawALightContent(x, y, r, lastArc, presentArc) {
          this.beginPath();
          this.fillStyle = '#000';
          this.arc(x, y, r, lastArc, presentArc, false);
          this.stroke();
          this.fill();
        }

        function $$drawALightText(index, x, y) {
          var text;
          switch(index) {
            case 0:
              text = 1;
            break;
            case 1:
              text = 2;
            break;
            case 2:
              text = 3;
            break;
            case 3:
              text = 4;
            break;
            case 4:
              text = 5;
            break;
            default: return;
          }
          this.font = '2rem Consolas';
          this.textBaseline = 'middle';
          this.fillStyle = '#000';
          this.fillText(text, x, y);
        }

        function $$drawALine(startX, startY, endX, endY) {
          this.beginPath();
          this.moveTo(startX, startY);
          this.lineTo(endX, endY);
          this.stroke();
        }


        // set cache
        (function() {
          if (!$$cache.canvas) $$cache.canvas = canvas;
          if (!$$cache.ctx) $$cache.ctx = ctx;
          if (!$$cache.canHeight) $$cache.canHeight = canHeight;
          if (!$$cache.canWidth) $$cache.canWidth = canWidth;
          if (!$$cache.r) $$cache.r = r;
          if (!$$cache.x) $$cache.x = x;
        }.bind(this))();

      }.bind(this))($$cache);
    },
    set4: function() {
      console.log('set4')
    },
    set5: function() {
      console.log('set5')
    },
    clear1: function() {
      var $$cache = this.cache.page1,
          $page = $$cache.$page,
          $female = $$cache.$female,
          $text = $$cache.$text;
      /**
       * clear female and text move
       */
      setTimeout(function() {
        $female.removeClass('female-go-in');
        $text.each(function() {
          $(this).removeClass('text-go-in');
          $(this).removeClass('text-go-large');
        });
      }, 100);
    },
    clear2: function() {
      var $$cache = this.cache.page2,
          $page   = $$cache.$page,
          $female = $$cache.$female,
          $text   = $$cache.$text,
          $icons  = $$cache.$icons,
          $cloud  = $$cache.$cloud;

      /**
       * clear female and icons and cloud
       */
    },
    clear3: function() {
      var $$cache = this.cache.page3;
      /**
       * clear canvas
       */
      (function() {
        if ($$cache.ctx && $$cache.canWidth && $$cache.canHeight) $$cache.ctx.clearRect(0, 0, $$cache.canWidth, $$cache.canHeight);
      })();
    },
    clear4: function() {
      console.log('clear4')
    },
    clear5: function() {
      console.log('clear5')
    }
  };

  var swiper   = new Swiper('.container', {
    direction: 'vertical',
    scrollbarDraggable: false,
    mousewheelControl: true,
    onInit: function() {
      $loading.fadeOut();
      $('.page').each(function() {
        pages.push(this);
      });
      cursor = 1;
      PageSetFuncs['set'+cursor]();
    },
    onSlideChangeStart: function() {
      PageSetFuncs['clear'+cursor]();
      cursor = pages.indexOf($('.page.swiper-slide-active')[0])+1;
      PageSetFuncs['set'+cursor]();
    }
  });
});
// (function (doc, win) {
//   var docEl = doc.documentElement,
//     resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
//     recalc = function () {
//       var clientWidth = docEl.clientWidth;
//       if (!clientWidth) return;
//       docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
//     };

//   if (!doc.addEventListener) return;
//   win.addEventListener(resizeEvt, recalc, false);
//   doc.addEventListener('DOMContentLoaded', recalc, false);
// })(document, window);