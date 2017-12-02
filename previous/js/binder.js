var Binder = function(charade, typer) {
  this.location = function() {
    $(window).on('hashchange', function() {
      var to = window.location.hash.substring(1);
      if (!charade.standsby) {
        typer.hasten().then(function() {
          typer.unhasten();
          charade.hop(to);
        });
      } else {
        charade.hop(to);
      }
    });
  };
  this.input = function() {
    $(document).keypress(function(e) {
      if (charade.standsby) {
        switch (e.which) {
          case 13:
            charade.standby();
            charade.hop($('.input').text());
            break;
          case 8:
            $('.input').text($('.input').text().slice(0, -1));
            break;
          default:
            $('.input').append(String.fromCharCode(e.which));
            break;
        }
      }
    });
  };
}
