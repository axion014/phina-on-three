phina.define('phina.display.ThreeApp', {
	superClass: 'phina.display.DomApp',
	init: function(options) {
		options = (options || {}).$safe(phina.display.CanvasApp.defaults);

		if (!options.query && !options.domElement) {
			this.renderer = new THREE.WebGLRenderer();
      options.domElement = this.renderer.domElement;
      if (options.append) {
        document.body.appendChild(options.domElement);
      }
    }
    if(!options.runner && phina.isAndroid()) {
      options.runner = phina.global.requestAnimationFrame;
    }
		this.superInit(options);

		this.scene = new THREE.Scene();
		if (!this.renderer) this.renderer = new THREE.WebGLRenderer({canvas: this.domElement});
		this.renderer.setSize(options.width, options.height);

		this.camera = new THREE.OrthographicCamera(0, options.width, options.height, 0, 0, Infinity);

		this.gridX = phina.util.Grid({
      width: options.width,
      columns: options.columns,
    });
    this.gridY = phina.util.Grid({
      width: options.height,
      columns: options.columns,
    });

		this.backgroundColor = (options.backgroundColor !== undefined) ? options.backgroundColor : 'white';

		if (options.fit) {
      this.fitScreen();
    }
	},
	_draw: function() {
    if (this.backgroundColor) {
      this.renderer.setClearColor(new THREE.Color(this.backgroundColor), 1);
    }
		this.renderer.clear();

    this.renderer.render(this.scene, this.camera);
  },

  fitScreen: function() {
      var _fitFunc = function() {
        var e = this.domElement;
        var s = e.style;

        s.position = "absolute";
        s.margin = "auto";
        s.left = "0";
        s.top  = "0";
        s.bottom = "0";
        s.right = "0";

        var rateWidth = e.width/window.innerWidth;
        var rateHeight= e.height/window.innerHeight;
        var rate = e.height/e.width;

        if (rateWidth > rateHeight) {
          var width  = Math.floor(window.innerWidth);
          var height = Math.floor(window.innerWidth*rate);
        } else {
          var width  = Math.floor(window.innerHeight/rate);
          var height = Math.floor(window.innerHeight);
        }
				this.renderer.setSize(width, height);
      }.bind(this);

      // 一度実行しておく
      _fitFunc();

      // リサイズ時のリスナとして登録しておく
      phina.global.addEventListener("resize", _fitFunc, false);
  },
});
