// HTML document is loaded. DOM is ready.
$(window).on("load", function(){     
"use strict";

// load dom ready then function
$.ready.then(function(){				  

// miscellaneous var 
var loader = $('.preloader');
var allelement = $('div, h1, h2, h3, h4, h5, p, ul, li, a, i, button, section, span');
var holdside = $('.holdsidebar');

// wrapper var
var expeditionpage = $('.expedition-page');
var whitepage = $('.white-page');

// page var 
var expeditionhome = $('.contentexpedition');
var bgslideshow = $('#bgslideshow, #particles, .bgexpedition');
var slidtext = $('#slidertext');

// button var 
var animmenu = $('#nav-menu li');
var listmenu = $('#nav-menu li a'); 
var mainmenu = $('.main-menu');
var overlaymenu = $('.overlay-menu');
var iconnav = $('#nav-icon');
var galnav = $('#opengal');
var galclose = $('.nav-bottom-close, .btn-content');

//gallery
var maingall = $('.bottom-option');

//scroll var
var $win = $(window);
var nice = $("#wraperexpedition");
var totop = $('#totop');
var topblock = $('.nav-top-block');

// start function
loader.fadeOut('fast', function() {					

 // call function all element animation when page has loaded
 page();
 
//block header when scroll
if (nice.length) {
    var scrollTrigger = 10, 
        backToTop = function () {
            var scrollTop = $win.scrollTop();
            if (scrollTop > scrollTrigger) {
                topblock.addClass('nav-block-show');
	            totop.fadeIn(100);
            } else {
                topblock.removeClass('nav-block-show');
	            totop.fadeOut(100);
            }
        };
    backToTop();
    $win.on('scroll', function () {
        backToTop();
    });
    totop.on("click", function(e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 800);
    });
}
	
  //navigation icon mobile
    $('.anim-nav').on("click", function(e) {
        e.preventDefault();
        $(this).toggleClass('open');
        $('#main-menu').toggleClass('menu-show');
    });
      
      

  
  // navigation slide up gallery
  galnav.on('click', function(e) {
	$(this).fadeOut(500);
	maingall.removeClass('fadeOutDown').fadeIn(1000).addClass('animfadeInUpBig');
  });
  // navigation slide down gallery
  galclose.on('click', function(e) {
	galnav.fadeIn(500);
	maingall.addClass('fadeOutDown').fadeOut(1500);
  });

 // main animation all element
 function page(){
     $([allelement]).each(function(index, foundElements) {
           foundElements.each(function(element) {
            var $this = $(this);
            var time = $(this).attr('data-time');
            setTimeout(function() {
            $this.addClass('intro');
            }, time);
        });
        setTimeout(function () {
        holdside.hide();}, 2500
        );
		$('.opening').hide();
    });
 
  
 // subscribe
 $("form#subscribe").submit(function() {
 $("form#subscribe .subscribeerror").remove();
 var s = !1;
 if ($(".subscribfield").each(function() {
   if ("" == jQuery.trim($(this).val())) $(this).prev("label").text(), $(this).parent().append('<span class="subscribeerror">Please fill your email</span>'), $(this).addClass("inputError"), s = !0;
   else if ($(this).hasClass("subscribeemail")) {
    var e = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    e.test(jQuery.trim($(this).val())) || ($(this).prev("label").text(), $(this).parent().append('<span class="subscribeerror">Please fill valid email</span>'), $(this).addClass("inputError"), s = !0)
   }
  }), !s) {
  $("form#subscribe input.submit").fadeOut("slow", function() {
   $(this).parent().append("")
  });
  var e = $(this).serialize();
  $.post($(this).attr("action"), e, function() {
   $("form#subscribe").fadeIn(1e3, function() {
    $(".subscribesuccess").fadeIn(1e3)
   }), setTimeout(function() {
    $("#subscribeemail").val(""), $(".subscribesuccess").hide()
   }, 2500)
   })
  }
  return !1
 });


 // contact form
 $(function(){$('#send').on('click', function(e) {
 e.preventDefault();var e=$('#name').val(),a=$('#email').val(),s=$('#message').val(),r=!1;if(0==a.length||"-1"==a.indexOf("@")||"-1"==a.indexOf( ".")){var r=!0;$("#error_email").fadeIn(500)}else $("#error_email").fadeOut(500);if(0==s.length){var r=!0;$("#error_message").fadeIn(500)}else $( "#error_message").fadeOut(500);return 0==r&&($("#send").attr({disabled:"true",value:"Loading..."}),$.ajax({type:"POST",url:"send.php",data:"name="+e+"&email="+a+"&subject=You Got Email&message="+s,success:function(e){"success"==e?($(".smart-btn").remove(),$("#mail_success").fadeIn(500)):($("#mail_failed").html(e).fadeIn(500),$("#send").removeAttr("disabled").attr("value","send").remove())}})),!1})});
 
 
// comment post
$(function() {
    $('#sendcomment').on('click', function(e) {
        e.preventDefault();
        var e = $('#name').val(),
            a = $('#email').val(),
            s = $('#message').val(),
            r = !1;
        if (0 == a.length || "-1" == a.indexOf("@") || "-1" == a.indexOf(".")) {
            var r = !0;
          $("input#email").css({"border-color": "#f24f47", 
             "border-width":"1px", 
             "border-style":"solid"});
        } else  $("input#email").css("border", "none");
		if (0 == e.length) {
            var r = !0;
             $('#name').css({"border-color": "#f24f47", 
             "border-width":"1px", 
             "border-style":"solid"});
        } else $('#name').css("border", "none");
        if (0 == s.length) {
            var r = !0;
            $('#message').css({"border-color": "#f24f47", 
             "border-width":"1px", 
             "border-style":"solid"});
        } else  $('#message').css("border", "none");
        return 0 == r && ($("#sendcomment").attr({
            disabled: "true",
            value: "Sending..."
        }), $.ajax({
            type: "POST",
            url: "comment.php",
            data: "name=" + e + "&email=" + a + "&subject=You Got Email&message=" + s,
            success: function(e) {
                "success" == e ? ($(".smart-btn").remove(), $("#mail_success").fadeIn(500)) : ($("#mail_failed").html(e).fadeIn(500), $("#sendcomment").removeAttr("disabled").attr("value", "send").remove())
            }
        })), !1
		
    })
});

 } // function end

 // reset animation
 function pagereset(){
    allelement.removeClass('intro');
    $(':input','#form1').val('');
    $('#error_message, #error_email', '.message').fadeOut(1500);
    $('#error_message').fadeOut(500);
    $('#error_email').fadeOut(500);
    $('#mail_success').fadeOut(500);
	$("#subscribeemail").val("");
	$("form#subscribe .subscribeerror").remove();
 }

});


// plugin start
 
 // countDown
 $(function(){
 $('#given_date').countdowntimer({
  dateAndTime : "2018/01/01 00:00:00",
  size : "lg",
  regexpMatchFormat: "([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})",
  regexpReplaceWith: "$1<sup>days</sup> $2<sup>hours</sup> $3<sup>mnt</sup> $4<sup>sec</sup>"
   });
 });

//slideshow background
$(function() {
    var slideBegin = 4000,
        transSpeed = 1000,
        simple_slideshow = bgslideshow,
        listItems = simple_slideshow.children('.bgexpedition'),
        listLen = listItems.length,
        i = 0,
        changeList = function() {
            listItems.eq(i).fadeOut(transSpeed);
            i += 1, i === listLen && (i = 0), listItems.eq(i).fadeIn(transSpeed);
        };
    listItems.not(':first').hide(), setInterval(changeList, slideBegin);
});

//slideshow text home
$(function() {
    var slideBegin = 3000,
        transSpeed = 500,
        simple_slideshow = slidtext,
        listItems = simple_slideshow.children('.main-text, .main-text-left'),
        listLen = listItems.length,
        i = 0,
        changeList = function() {
            listItems.eq(i).fadeOut(transSpeed, function() {
                i += 1, i === listLen && (i = 0), listItems.eq(i).fadeIn(transSpeed)
            })
        };
    listItems.not(':first').hide(), setInterval(changeList, slideBegin);
});


// Magnific Popup img
$('.big-img').magnificPopup({
		delegate: 'a',
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: false,
		mainClass: 'mfp-with-zoom mfp-img-mobile',
		image: {
			verticalFit: true,
		},
		gallery: {
			enabled: false
		},
		zoom: {
			enabled: true,
			duration: 300, // don't foget to change the duration also in CSS
			opener: function(element) {
				return element.find('img');
			}
		}
		
	});


// Magnific Popup dailymotion
$('.big-video').magnificPopup({
  type: 'iframe',
  iframe: {
    patterns: {
      dailymotion: {
        index: 'dailymotion.com',
        id: function(url) {        
            var m = url.match(/^.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/);
            if (m !== null) {
                if(m[4] !== undefined) {
                    return m[4];
                }
                return m[2];
            }
            return null;
        },
        src: 'http://www.dailymotion.com/embed/video/%id%'
      }
    }
  }
});

// Magnific Popup youtube
$('.big-youtube').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-with-zoom mfp-img-mobile',
    removalDelay: 0,
    preloader: false,
    fixedContentPos: false,
    iframe: {
        patterns: {
            youtube: {
                src: 'http://www.youtube.com/embed/%id%?autoplay=1&rel=0'
            }
        }
    }
});

//Magnific Popup html
$('.detail-page').magnificPopup({					
		type: 'ajax',
		alignTop: true,
		overflowY: 'scroll'
	});

// Magnific Popup form
$('.popup-form').magnificPopup({
		type: 'inline',
		preloader: false,
		focus: '#subscribeemail',

		// When elemened is focused, some mobile browsers in some cases zoom in
		// It looks not nice, so we disable it:
		callbacks: {
			beforeOpen: function() {
				$("#subscribeemail").val("");
	            $("form#subscribe .subscribeerror").remove();
				if($(window).width() < 700) {
					this.st.focus = false;
				} else {
					this.st.focus = '#subscribeemail';
				}
			}
		}
});

   
// owlCarousel testimonial
var owl = $("#owl-testimonial");
   owl.owlCarousel({
   items : 1,
   itemsDesktop : [1000,1], 
   itemsDesktopSmall : [900,1], 
   itemsTablet: [600,1],
   itemsMobile : false,
   autoPlay : 3000,
   stopOnHover : true
});
   
// owlCarousel brand
var owl = $("#owl-brand");
   owl.owlCarousel({
   items : 5, 
   itemsDesktop : [1000,4], 
   itemsDesktopSmall : [900,3], 
   itemsTablet: [600,2],
   itemsMobile : false,
   autoPlay : 2000,
   stopOnHover : true
});	
   
// owlCarousel gallery
var owl = $("#owl-gal");
        owl.owlCarousel({
        navigation: true,
        stopOnHover : true,
		itemsDesktop : [1600,4],
		itemsDesktopSmall : [1024,3], 
        itemsTablet: [800,2],
        navigationText: [
        "<i class='fa fa-angle-left'></i>",
        "<i class='fa fa-angle-right'></i>"
        ],

      });
		
		
// owl slider home

  var time = 7; // time in seconds
 
  var $progressBar,
      $bar, 
      $elem, 
      isPause, 
      tick,
      percentTime;
 
    //Init the carousel
    $("#owl-slider-home").owlCarousel({
      slideSpeed : 500,
      paginationSpeed : 500,
      singleItem : true,
      afterInit : progressBar,
      afterMove : moved,
	  loop : true,
      autoHeight: true,
      touchDrag : false,
      mouseDrag : false
    });
 
    //Init progressBar where elem is $("#owl-slider-home")
    function progressBar(elem){
      $elem = elem;
      //build progress bar elements
      buildProgressBar();
      //start counting
      start();
    }
 
    //create div#progressBar and div#bar then prepend to $("#owl-slider-home")
    function buildProgressBar(){
      $progressBar = $("<div>",{
        id:"progressBar"
      });
      $bar = $("<div>",{
        id:"bar"
      });
      $progressBar.append($bar).prependTo($elem);
    }
 
    function start() {
      //reset timer
      percentTime = 0;
      isPause = false;
      //run interval every 0.01 second
      tick = setInterval(interval, 10);
    };
 
    function interval() {
      if(isPause === false){
        percentTime += 1 / time;
        $bar.css({
           width: percentTime+"%"
         });
        //if percentTime is equal or greater than 100
        if(percentTime >= 100){
          //slide to next item 
          $elem.trigger('owl.next')
        }
      }
    }
 
    //moved callback
    function moved(){
      //clear interval
      clearTimeout(tick);
      //start again
      start();
    }

});
});

// plugin end 
// HTML document loaded DOM end 