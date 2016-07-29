/**
 * Created by millie.lin on 12/9/13.
 */
(function($, window, document) {

  var machine = new Machine(function(poorMan) {
    var rolling_times = 300;
    var delay = 10;
    var slow_down_since = rolling_times - 25;

    // TODO convert these to React style
    $('.main-container').removeClass('show animated fadeOutUp');
    $('.main-container').addClass('hide');
    $('#rolling-view-container').addClass('show animated fadeInDown');

    var itemsArr = [];
    var $items = $('.item-list li').clone().each(function(i, v){
      itemsArr[i] = $('<li>').append($(v).text());
    });

    var stopping = false;

    var itemsTotal = $items.length; 
    var idMatched = -1;

    // find the matched ID
    for(var i = 0 ; i < itemsTotal ; i++){
      if( $($items[i]).prop('id') == poorMan){ idMatched = i; break; }
    }

    // compute the starting counter value
    var start_value = idMatched - rolling_times, target_value = idMatched;
    while(start_value < 0){
      start_value += itemsTotal;
      target_value += itemsTotal;
    }

    // console.log('start value: ', start_value, ', matched: ', idMatched, 'poor man: ', poorMan);

    function loopAndLoop(counter) {
      // console.log('loopAndLoop, counter: ', counter);
      // this is not animation...
      var $rolling = $('ul.rolling-list');
      var newItemsOrder = itemsArr.slice((counter - 2) % $items.length).concat(itemsArr.slice(0, (counter - 2) % $items.length));
      $rolling.empty();
      for (var i = 0; i < newItemsOrder.length; i++) {
        $rolling.append(newItemsOrder[i]);
      }

      var winHeight = $(window).height();
      $('.rolling-list').css({
        'height': winHeight-60,
        //'width': winHeight
      });

      $('.rolling-list li').css({
        'font-size': winHeight/85 + 'em',
        'margin-top': '10px'
      });

      $('.mask').css({
        'height': winHeight/2.6
      });

      if (counter >= target_value) {

        // winning condition 
        $('#winner-span').text(poorMan);
        setTimeout(function() {
          $('.main-container').removeClass('show animated fadeOutUp');
          $('.main-container').addClass('hide');
          $('#result-view-container').addClass('show animated fadeInDown');
        }, 1000);
        return;
      } else if (counter == target_value - 1) {
        delay = 800;
      } else if (counter == target_value - 2) {
        delay = 500;
      } else if (counter == target_value - 3) {
        delay = 300;
      }

      setTimeout(function() {
        loopAndLoop(++counter);
      }, delay);

      // Slow down incrementally
      if(counter > slow_down_since) delay += 1;
    }
    loopAndLoop(start_value);
  });
  window.machine = machine;

  $(document).ready(function(){

    //    Tooltip
    $('.tooltip-container').mouseenter(function(){
      $('.tooltip').slideDown('fast');

    }).mouseleave(function(){
      $('.tooltip').slideUp('fast');
    });

    //        Toggle Views
    function showEditListView() {
      $('.main-container').removeClass('show animated fadeOutUp');
      $('.main-container').addClass('hide');
      $('#edit-item-container').addClass('show animated fadeInDown');
    }

    $('.logo').click(function(){
      showEditListView();
    });
    function showStartView() {
      $('.main-container').removeClass('show animated fadeOutUp');
      $('.main-container').addClass('hide');
      $('#start-view-container').addClass('show animated fadeInDown');
    }

    $('#edit-item-container .btn-done').click(function(){
      showStartView();
    });

    // Define the responsive round START button
    var winHeight = $(window).height();

    var updateStartButtonStyle = function(){
      winHeight = $(window).height();
      $('.btn-start').css({
        'height' :  winHeight/1.5,
        'width' : winHeight/1.5,
        'border-radius': ($(this).width())/2
      });
      $('.btn-start i.fa-compass').css({
        'font-size': $('.btn-start').height()/2.5
      });
      $('.btn-start span.text').css({
        'font-size': $('.btn-start').height()/2.5
      });

      //Rolling List
      $('.rolling-list').css({
        'height': winHeight,
        'width': '100%',
        'overflow':'hidden'
      });
      $('.rolling-list li').css({
        'font-size': winHeight/20
      });
      $('#mask-top').css({
        'height': winHeight/2.5
      });
      $('#mask-bottom').css({

        'height':winHeight/10,
        'top': winHeight/1.8
      });

      //Result View
      $('.winner').css({
        'font-size': winHeight/100 + 'em',
        'margin-top': winHeight/3.5
      });
      $('#result-view-container .btn-start').css({
        'height' :  winHeight/5,
        'width' : winHeight/5,
        'border-radius': ($(this).width())/2,
          'margin-top': winHeight/8
      });
      $('#result-view-container .btn-start i.fa-compass').css({
        'font-size': $('#result-view-container .btn-start').height()/2
      });
      $('#result-view-container .btn-start span.text').css({
        'font-size': $('#result-view-container .btn-start').height()/5
      });
    };

    updateStartButtonStyle();
    $(window).resize(function(){
      updateStartButtonStyle();
    });

    function go() {
      if ($('.item-list li').length > 0) {

        machine.rand();
      } else {
        showEditListView();
      }
    }

    $('.btn-start').bind('click', function() {
      go();
    });
    $('body').on('keydown', function(e) {
      if ((e.keyCode || e.which) == 13 && $('.btn-start').is(':visible')) {
        go();
      }
    });

    // Load Start Button View
    $('.btn-start').mouseenter(function(){
      $(this).children('.fa-compass').removeClass('show');
      $(this).children('.fa-compass').addClass('hide rotateOut');
      $(this).children('.text').removeClass('hide flipOutX');
      $(this).children('.text').addClass('show flipInX');
    });
  });
})(jQuery, window, document);
