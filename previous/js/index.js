$(document).ready(function() {
  var typer = new Typer(30, function(text) {
    $('#typecursor').before(text);
  });
  var charade = new Charade(waiter, typer);
  var binder = new Binder(charade, typer);

  /* Bind events */
  binder.location();
  binder.input();

  /* Begin charade */
  var to = window.location.hash.substring(1);
  charade.hop((to.length == 0) ? 'initial' : to);
  setInterval(function() {
    if(charade.standsby) {
      $('title').text('Ivo Sequeros del Rey (standby)');
    }
    else {
      $('title').text('Ivo Sequeros del Rey (not standby)');
    }
  },30);

});
