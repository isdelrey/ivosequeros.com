var Charade = function(waiter, typer) {
  var parent = this;
  var last_height = 0;
  var initial_passed = false;
  this.standsby = false;
  this.standby = function() {
    $('#typecursor').detach().insertAfter('.input');
    this.standsby = true;
  }
  this.stages = {
    initial: {
      render : function() {
        return new Promise(function(resolve, reject) {
          initial_passed = true;
          parent.hop('hello');
          resolve();
        });
      }
    },
    hello: {
      render : function() {
        return new Promise(function(resolve, reject) {
          $('#typecursor').before('<span class="color extra-big">Hi! </span><span class="extra-big"></span>').detach().appendTo('main section:last *:last');

          return typer.type("My name is Ivo and I'm a full-stack Developer ").then(function() {
            $('#typecursor').before('<i></i>').detach().appendTo('main section:last *:last');
            return typer.type("&");
          }).then(function() {
            $('#typecursor').detach().appendTo('main section:last').before('<span class="extra-big"></span>').detach().appendTo('main section:last *:last');
            return typer.type(" Computer Science student based in Barcelona");
          }).then(function() {
            return parent.hop('menu');
          });
        });
      }
    },
    menu: {
      render : function() {
        $('.input').detach().appendTo($('#typecursor').parent());
        $('#typecursor').parent().addClass('menu');
        $('#typecursor').before('<div class="light-text inline">Select any of the sections available on the top-right menu or <b>type the name of any section</b>:</div>');
        parent.standby();
        return waiter(80);
      }
    },
    _404: {
      render : function() {
        $('#typecursor').before('<span class="extra-big"></span>').detach().appendTo('main section:last *:last');
        return typer.type('This page has not been written yet!').then(function() {
          parent.hop('menu');
          resolve();
        });
      }
    },
    work: {
      render : function() {
        $('#typecursor').before('<span class="extra-big"></span>').detach().appendTo('main section:last *:last');
        return typer.type('Work').then(function() {
          return new Promise(function(resolve, reject) {
            $('#typecursor').detach().appendTo('main section:last')
              .before('<div class="from-top-10"><figure class="frame"><object data="http://edelrey.es" width="1200" height="800" type="text/html"></object></figure><figure class="frame"><object data="http://aidarpsicologia.com" width="1200" height="800" type="text/html"></object></figure></div>');
            parent.hop('menu');
            resolve();
          });
        });
      }
    },
    contact: {
      render : function() {
        $('#typecursor').before('<a class="extra-big block" href="tel:+34661412440"></a>').detach().appendTo('main section:last *:last');
        return typer.type('(+34) 661 412 440').then(function () {
          $('#typecursor').before('<a class="extra-big block grey c" href="mailto:ivosequeros@me.com"></a>').detach().appendTo('main section:last *:last');
          return typer.type('ivosequeros@me.com');
        }).then(function() {
          return new Promise(function(resolve, reject) {
            parent.hop('menu');
            resolve();
          });
        });
      }
    }
  };
  this.hop = function(to) {
    var destination = parent.stages[(to in parent.stages) ? to : '_404'];
    /* scroll down to push up */
    if ($('main section:last').length && to != 'menu') {
      $('body').height($('main section:last').offset().top + $(window).height() - 140);
      $('body').animate({
        'scrollTop': $('main section:last').offset().top + $('main section:last').height()
      }, 600);
    }
    last_height = (to != 'menu') ? destination.height : last_height;
    return new Promise(function(resolve, reject) {
      if (to != 'initial') {
        $('main').append('<section></section>');
        $('#typecursor').detach().appendTo('main section:last');
        $('.input').text('');

      }
      destination.render().then(resolve);
    });
  };

}
