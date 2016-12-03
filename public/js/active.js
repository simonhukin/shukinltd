/* ===================== active your plugin here ========================= */

(function($) {
    "use strict";


    /* ==========================================================================
   window laod function
   ========================================================================== */

    $(window).load(function() {
        $(window).trigger("scroll");
        $(window).trigger("resize");
        (function() {

          var support = { animations : Modernizr.cssanimations },
            container = document.getElementById( 'ip-container' ),
            header = container.querySelector( 'div.ip-header' ),
            loader = new PathLoader( document.getElementById( 'ip-loader-circle' ) ),
            animEndEventNames = { 'WebkitAnimation' : 'webkitAnimationEnd', 'OAnimation' : 'oAnimationEnd', 'msAnimation' : 'MSAnimationEnd', 'animation' : 'animationend' },
            // animation end event name
            animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];

          function PRE_init() {
            var onEndInitialAnimation = function() {
              if( support.animations ) {
                this.removeEventListener( animEndEventName, onEndInitialAnimation );
              }

              startLoading();
            };

            // disable scrolling
            window.addEventListener( 'scroll', noscroll );

            // initial animation
            classie.add( container, 'loading' );

            if( support.animations ) {
              container.addEventListener( animEndEventName, onEndInitialAnimation );
            }
            else {
              onEndInitialAnimation();
            }
          }

          function startLoading() {
            // simulate loading something..
            var simulationFn = function(instance) {
              var progress = 0,
                interval = setInterval( function() {
                  progress = Math.min( progress + Math.random() * 0.1, 1 );

                  instance.setProgress( progress );

                  // reached the end
                  if( progress === 1 ) {
                    classie.remove( container, 'loading' );
                    classie.add( container, 'loaded' );
                    clearInterval( interval );

                    var onEndHeaderAnimation = function(ev) {
                      if( support.animations ) {
                        if( ev.target !== header ) return;
                        this.removeEventListener( animEndEventName, onEndHeaderAnimation );
                      }

                      classie.add( document.body, 'layout-switch' );
                      window.removeEventListener( 'scroll', noscroll );
                    };

                    if( support.animations ) {
                      header.addEventListener( animEndEventName, onEndHeaderAnimation );
                    }
                    else {
                      onEndHeaderAnimation();
                    }
                  }
                }, 80 );
            };

            loader.setProgressFn( simulationFn );
          }

          function noscroll() {
            window.scrollTo( 0, 0 );
          }

          PRE_init();

          })();
    });


    $(window).resize(function() {

    });

    /* ==========================================================================
   document ready function
   ========================================================================== */

    $(document).ready(function() {

        $(window).trigger("resize");

        $(".mobile-menu").click(function() {
            $(this).toggleClass("open");
            $("header nav > ul").slideToggle("slow");
        });

        $.stellar({
            horizontalScrolling: false,
            verticalOffset: 40
          });

        var pageSection = $(".page-content, .fixed-bg");
          pageSection.each(function(indx){

              if ($(this).attr("data-background")){
                  $(this).css("background-image", "url(" + $(this).data("background") + ")");
              }
          });

        initWorkFilter();
        init_masonry();

         // smooth scroll
        // $(function() {
        //       $('#atom-scroll-to-top').click(function() {
        //       if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        //         var target = $(this.hash);
        //         target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        //         if (target.length) {
        //         $('html,body').animate({
        //           scrollTop: target.offset().top
        //         }, 1000);
        //         return false;
        //         }
        //       }
        //       });
        //     });
    });

/* ---------------------------------------------
 Portfolio section
 --------------------------------------------- */

// Projects filtering
var fselector = 0;
var work_grid = $("#atom-works-grid");

function initWorkFilter(){
     var isotope_mode;
     if (work_grid.hasClass("masonry")){
         isotope_mode = "masonry";
     } else{
         isotope_mode = "fitRows";
     }
     work_grid.imagesLoaded(function(){
            work_grid.isotope({
                itemSelector: '.atom-work-item',
                layoutMode: isotope_mode,
                filter: fselector
            });
        });

        $(".atom-portfolio-filter > li > a").click(function(){
            $(".atom-portfolio-filter > li > a").removeClass("active");
            $(this).addClass("active");
            fselector = $(this).attr('data-filter');

            work_grid.isotope({
                itemSelector: '.atom-work-item',
                layoutMode: isotope_mode,
                filter: fselector
            });
            return false;
        });
}

/* ---------------------------------------------
 Masonry
 --------------------------------------------- */

function init_masonry(){
    $(".masonry").imagesLoaded(function(){
        $(".masonry").masonry();
    });
}




})(jQuery);
