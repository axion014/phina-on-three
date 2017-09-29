phina.namespace(function() {
  var tmpinit = phina.input.Input.prototype.init;

  phina.input.Input.prototype.init = function(domElement) {
    tmpinit(domElement);
    this.width = this.domElement.width;
    this.height = this.domElement.height;
  };

  phina.input.Input.prototype._move = function(x, y) {
    var elm = this.domElement;
    this._tempPosition.x = x * this.width / (elm.style.width ? parseInt(elm.style.width) : elm.width);
    this._tempPosition.x = y * this.height / (elm.style.height ? parseInt(elm.style.height) :   elm.height);
  };
});
