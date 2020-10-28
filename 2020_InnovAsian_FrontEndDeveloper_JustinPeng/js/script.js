// Collapses Navbar
$(document).click(function (event) {
    var target = $(event.target);
    var _mobileMenuOpen = $(".navbar-collapse").hasClass("show");
    if (_mobileMenuOpen === true && !target.hasClass("navbar-toggler")) {
        $("button.navbar-toggler").click();
    }
});

// Handles Navbar Active Changes
$(".nav-link").click(function(){
  $(".nav-link").removeClass("active");
  $(this).addClass("active");
  console.log('hi');
});

// Counts Up
$(window).on('scroll',function() {
  $('.counter').each(function() {
    var hT = $(this).offset().top,
        hH = $(this).outerHeight(),
        wH = $(window).height(),
        wS = $(window).scrollTop();

    if (wS > ((hT+hH-wH))){
      var counter = $(this),
      countTo = counter.attr('data-count');
    
      const countObj = { countNum: counter.text()}
    
      $(countObj).animate({
        countNum: countTo
      }, {
        duration: 2000,
        easing:'swing',
        step: function() {
          counter.text(Math.floor(this.countNum));
        },
        complete: function() {
          counter.text(this.countNum);
        }
      });
    }
  });
});
