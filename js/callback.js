var main = false;
var cl = false;
var scrollOld = 0;
var scroll = 0;
var about_popup = 0;
var t = 0;

$(function() {

  var callback_phone_pos = function() {
   
  }
  $(window).resize(function() {
    callback_phone_pos();
  });
  $(window).scroll(function() {
    var k = $(document).scrollTop() + $(window).height() / 2;
      
      $('.callback-phone').stop().fadeIn(200); 
    


  });
  callback_phone_pos();

  $('.callback-phone').on('mouseenter', function() {        
    if ($('.callback-phone').data('hover') != 'true') {
      var padding = $('.callback-phone .phone').css('padding-left');      
      var padding2 = $('.callback-phone .border').css('padding-left');      
      $('.callback-phone .phone').removeClass('animation');   
      $('.callback-phone .border').removeClass('animation2');   
      $('.callback-phone .phone').css('padding', padding);      
      $('.callback-phone .border').css('padding', padding);      
      $('.callback-phone').data('hover', 'true');
      $('.callback-phone .border').stop().animate({padding: 0, opacity: 0});
      $('.callback-phone .phone').stop().animate({padding: 0, opacity: 0}, 200, function() {          
        $('.callback-phone .tooltip').show();                
        $('.callback-phone .tooltip').stop().animate({opacity: 1}, 300);
      })
    }
  }).on('mouseleave', function() {    
    if ($('.callback-phone').data('hover') == 'true') {            
      $('.callback-phone .phone').css('opacity', 1);
      $('.callback-phone .border').css('opacity', 1);
      $('.callback-phone .phone').addClass('animation');
      $('.callback-phone .border').addClass('animation2');

      $('.callback-phone .tooltip').stop().animate({opacity: 0}, 300, function() {      
        $('.callback-phone').data('hover', 'false');
        $('.callback-phone .tooltip').hide();
      });
    }
  }).on('click', function() {
    change_order(1);
  });


});



