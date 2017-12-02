var waiter = function(after) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve();
    }, after);
  });
};
var Typer = function(ms, onType) {
  var hasten = false;
  this.hasten = function() {
    hasten = true;
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve();
      }, 500);
    });
  };
  this.unhasten = function() {
    hasten = false;
  };
  this.type = function(text) {
    var self = this;
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        if (hasten) {
          onType(text);
          resolve();
          return;
        }
        onType(text.charAt(0));
        if (text.length < 1) {
          resolve();
        } else {
          self.type(text.substring(1, text.length), onType).then(resolve);
        }
      }, ms + Math.random() * ms);
    });
  }
}
