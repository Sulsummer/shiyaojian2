$(document).ready(function() {
  var pages    = [],
      cursor   = 1,
      $loading = $('#loading'),
      $$width  = $('body').width(),
      $$height = $('body').height(),
      d        = document,
      $down    = (function() {
        var $down   = $(d.createElement('div')),
            $downbg = $(d.createElement('div'));
        $downbg.addClass('down-bg');
        $down.addClass('down');
        $down.height($$width*0.2);
        $downbg.append($down);
        return $downbg;
      })(),
      $switch   = $('.music'),
      $music    = $('#musicfx').get(0);

  // $(d.body).on('click', function(e) {
  //   if ($(e.target).hasClass('switch')) {
  //     if ($switch.hasClass('on')) {
  //       $switch.removeClass('on');
  //       $switch.addClass('off');
  //       $music.pause();
  //     }
  //     else {
  //       $switch.removeClass('off');
  //       $switch.addClass('on');
  //       $music.play();
  //     }
  //   }
  // });
  $(d.body).on('touchend', function(e) {
    if ($(e.target).hasClass('switch')) {
      if ($switch.hasClass('on')) {
        $switch.removeClass('on');
        $switch.addClass('off');
        $music.pause();
      }
      else {
        $switch.removeClass('off');
        $switch.addClass('on');
        $music.play();
      }
    }
  });


  var PageSetFuncs = {
    cache: {
      page1: {},
      page2: {},
      page3: {},
      page4: {},
      page5: {},
      page6: {}
    },
    set1: function() {
      var $$cache = this.cache.page1,
          $page   = $$cache.$page,
          $female = $$cache.$female,
          $text   = $$cache.$text;

      if (!$page) $page = $$cache.$page = $('#page1');
      if (!$female) $female = $$cache.$female = $page.find('.female');
      if (!$text) $text = $$cache.$text = $page.find('.text');

      if ($$cache.once) {
        $$cache.DURATION = 0;
      }
      else $$cache.DURATION = 3500;

      
      setTimeout(function() {

        // /**
        //  * handle those only once:
        //  * 1.clouds
        //  * 2.female
        //  */
        if (!$$cache.once) {
          (function() {
            $page.find('.clouds').each(function(i, cloud) {
              $(cloud).height($(cloud).width()*9/16);
            });

            $female.width($female.height()/2.7);

            $$cache.once = true;
          })();
        }

        /**
         * animate: 1.female
         *          2.text = text1 + text2
         */
        (function() {
          $female.addClass('female-go-in');

          $text.each(function(i) {
            $(this).addClass('text-go-in-'+i);
          });

          setTimeout(function() {
            $text.eq(1).addClass('text-go-large');
          }, 1000);
        })();
      }, $$cache.DURATION);



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
        var height = $icons.eq(0).width();
        $icons.each(function() {
          $(this).height(height);
        });

        var width = $female.height()/2.5;
        $female.width(width);
        var rightString = $female.css('right'),
            right = parseInt(rightString.slice(0, rightString.indexOf('px')));
        // $text.width($page.width() - width - 20 - right);
        $$cache.once = true;
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
        }, 300);
      })();
    },
    set3: function() {
      var $$cache = this.cache.page3,
          $page   = $$cache.$page,
          $text   = $$cache.$text;

      if (!$page) $page = $$cache.$page = $('#page3');
      if (!$text) $text = $$cache.$text = $page.find('.blackboard>p');

      /**
       * animate: p in blackboard
       */
      (function() {
          var i = 0, len = $text.length;
          var interval = setInterval(function() {
              $text.eq(i).css('display', 'block').addClass('animated fadeInUp');
              if (i++ === len) clearInterval(interval);
          },  300);
      })();
      
    },
    set4: function() {
      var $$cache      = this.cache.page4,
          $page        = $$cache.$page,
          $loudspeaker = $$cache.$loudspeaker,
          $teletop     = $$cache.$teletop,
          $telebottom  = $$cache.$telebottom,
          $p           = $$cache.$p;

      if (!$page) $page = $$cache.$page = $('#page4');
      if (!$loudspeaker) $loudspeaker = $$cache.$loudspeaker = $page.find('.loudspeaker');
      if (!$teletop) $teletop = $$cache.$teletop = $page.find('.top');
      if (!$telebottom) $telebottom = $$cache.$telebottom = $page.find('.bottom');
      if (!$p) $p = $$cache.$p = $page.find('.board>p:first-child');
      /**
       * once
       */
      if (!$$cache.once) {
        $loudspeaker.height($loudspeaker.width()*9/10);
        $teletop.height($teletop.width()*1/4);
        $telebottom.height($telebottom.width()*2/4);

        $$cache.once = true;
      }
      /**
       * animate: p
       */
      (function() {
        $p.addClass('p-go-large');
      })();
      


    },
    set5: function() {
      var $$cache   = this.cache.page5,
          $page     = $$cache.$page,
          $seal     = $$cache.$seal,
          topOffset = $$cache.topOffset;

      if (!$page) $page = $$cache.$page = $('#page5');
      if (!$seal) $seal = $$cache.$seal = $page.find('.seal');

      
      var $canvas, $parent;

      if (!$page.find('canvas').length) {
        $canvas = $(d.createElement('canvas'));
        $canvas.attr('id', 'light');
        $page.append($canvas);

        $parent = $(d.createElement('div'));
        $parent.addClass('text-parent');
        $page.append($parent);
      }
      /**
       * once
       */
      if (!$$cache.once) {
        topOffset   = parseInt($('#light').css('margin-top').substring(0, $('#light').css('margin-top').indexOf('px')));
        $$cache.topOffset = topOffset;

        $$cache.once = true;
      }
      /**
       * animate: seal
       */
      $$cache.timeout = setTimeout(function() {
        $seal.css('opacity', 1);
        $seal.addClass('animated zoomIn');
      }, 4000);

      /**
       * canvas for lights
       */
      $$cache.timeout1 = setTimeout(function() {
        var canvas      = $$cache.canvas || document.getElementById('light'),
            ctx         = $$cache.ctx || canvas.getContext('2d'),
            canHeight   = $$cache.canHeight || $$height*(3/5) ,
            canWidth    = $$cache.canWidth  || $$width,
            LINE_COUNT  = 2,  //  each line equals LINE_COUNT lights's radius*2
            L_COUNT     = 5,  // a canvas contains L_COUNT lights
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
          var offset = 0;

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
          this.strokeStyle = '#fff';
          this.lineWidth = 2;
          this.stroke();
        }

        function $$drawALightContent(x, y, r, lastArc, presentArc) {
          this.beginPath();
          this.fillStyle = '#fff';
          this.arc(x, y, r, lastArc, presentArc, false);
          this.stroke();
          this.fill();
        }

        function $$drawALightText(index, x, y) {
          var text, $div = $(d.createElement('div'));
          $div.addClass('text');
          switch(index) {
            case 0:
              text = '注册';
            break;
            case 1:
              text = '生产';
            break;
            case 2:
              text = '流通';
            break;
            case 3:
              text = '使用';
            break;
            case 4:
              text = '餐饮';
            break;
            default: return;
          }
          // this.font = '1.7rem Consolas';
          // this.textBaseline = 'middle';
          // this.fillStyle = '#434343';
          // this.fillText(text, x, y);
          $div.text(text);
          $div.css({
            'left': x,
            'top': y + topOffset - r
          });
          $page.find('.text-parent').append($div);
        }

        function $$drawALine(startX, startY, endX, endY) {
          this.beginPath();
          this.moveTo(startX, startY);
          this.lineTo(endX, endY);
          this.stroke();
        }


        // set cache
        // (function() {
        //   if (!$$cache.canvas) $$cache.canvas = canvas;
        //   if (!$$cache.ctx) $$cache.ctx = ctx;
        //   if (!$$cache.canHeight) $$cache.canHeight = canHeight;
        //   if (!$$cache.canWidth) $$cache.canWidth = canWidth;
        //   if (!$$cache.r) $$cache.r = r;
        //   if (!$$cache.x) $$cache.x = x;
        // })();

      }, 0);
    },
    set6: function() {
      var $$cache = this.cache.page6,
          $page   = $$cache.$page,
          $police = $$cache.$police,
          $label  = $$cache.$label,
          $text   = $$cache.$text,
          text    = '携手共建食品安全城市';

      if (!$page) $page = $$cache.$page = $('#page6');
      if (!$police) $police = $$cache.$police = $page.find('.police');
      if (!$text) $text = $$cache.$text = $page.find('.label>.text');
      if (!$label) $label = $$cache.$label = $page.find('.label');

      /**
       * once: police
       */
      if (!$$cache.once) {
        $police.height($police.width()*4/3);
        $text.css('lineHight', $text.height());

        $$cache.once = true;
      }
      /**
       * animate: text
       */
      (function() {
        var i = 1, len = text.length;
        $$cache.interval = setInterval(function() {
          $text.text(text.substring(0, i));
          i ++;
          if (i > len) clearInterval($$cache.interval);
        }, 200);
      })();

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
        $text.each(function(i) {
          $(this).removeClass('text-go-in-'+i);
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
      (function() {
        $cloud.removeClass('animated bounceInDown');
        $female.removeClass('animated slideInUp');
        $text.removeClass('animated slideInUp');
        $icons.each(function(i, icon) {
          var $icon = $(icon);
          $icon.removeClass('animated bounceInDown');
          $icon.css('opacity', 0);
        });
      })();
    },
    clear3: function() {
      var $$cache = this.cache.page3,
          $text   = $$cache.$text;
      
      (function() {
          $text.each(function() {
            $(this).removeClass('animated fadeInUp');
            $(this).css('display', 'none');
          })
      })();
    },
    clear4: function() {
      var $$cache = this.cache.page4;
      /**
       * clear canvas
       */
      

    },
    clear5: function() {
      var $$cache = this.cache.page5,
          $page   = $$cache.$page,
          $seal   = $$cache.$seal;

      /**
       * clear: 1.canvas
       *        2.canvas text
       *        3.seal
       */
      (function() {
        if ($$cache.timeout) clearTimeout($$cache.timeout);
        if ($$cache.timeout1) clearTimeout($$cache.timeout1);
        $page.find('canvas').remove();
        $page.find('.text-parent').remove();
        $$cache.$canvas = null;



        // if ($$cache.ctx && $$cache.canWidth && $$cache.canHeight) $$cache.ctx.clearRect(0, 0, $$cache.canWidth, $$cache.canHeight);
        
        $page.find('.text').each(function() {
          $(this).remove();
        });

        $seal.css('opacity', 0);
        $seal.removeClass('animated zoomIn');
      })();
    },
    clear6: function() {
      var $$cache = this.cache.page6;

      if ($$cache.interval) clearInterval($$cache.interval);
    }
  };


  var swiper   = new Swiper('.container', {
    direction: 'vertical',
    scrollbarDraggable: false,
    onInit: function() {
      setTimeout(function() {
        $loading.fadeOut();
      }, 3500);
      // $loading.fadeOut();

      $('.page').each(function() {
        pages.push(this);
      });
      cursor = 1;
      PageSetFuncs['set'+cursor]();


      setTimeout(function() { 
        $(pages[cursor-1]).append($down);
      }, 4000);
    },
    onSlideChangeStart: function() {
      PageSetFuncs['clear'+cursor]();
      setTimeout(function() { 
        $(pages[cursor-1]).append($down);
      }, 4000);

      var cur = $('.page.swiper-slide-active');
      cursor = pages.indexOf(cur[0])+1;
      PageSetFuncs['set'+cursor]();

      setTimeout(function() { 
        $(cur).append($down);
      }, 4000);
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