
phina.define('phina.display.ThreeScene', {
  superClass: 'phina.app.Scene',

  init: function(params) {
    this.superInit();

    params = ({}).$safe(params, phina.display.DisplayScene.defaults);

    this.width = params.width;
    this.height = params.height;
    this.gridX = phina.util.Grid(params.width, 16);
    this.gridY = phina.util.Grid(params.height, 16);
    this.backgroundColor = (params.backgroundColor) ? params.backgroundColor : null;

    // TODO: 一旦むりやり対応
    this.interactive = true;
    this.setInteractive = function(flag) {
      this.interactive = flag;
    };
    this._overFlags = {};
    this._touchFlags = {};
  },

  hitTest: function() {
    return true;
  }

});
