phina.define('phina.display.ThreeApp', {
  superClass: 'phina.display.DomApp',
  init: function(options) {
    options = (options || {}).$safe(phina.display.CanvasApp.defaults);

    if (!options.query && !options.domElement) {
      this.renderer = new THREE.WebGLRenderer({antialias: true});
      options.domElement = this.renderer.domElement;
      if (options.append) document.body.appendChild(options.domElement);
    }
    if(!options.runner && phina.isAndroid()) options.runner = phina.global.requestAnimationFrame;
    this.superInit(options);

    this.scene = new THREE.Scene();
    if (!this.renderer) this.renderer = new THREE.WebGLRenderer({antialias: true, canvas: this.domElement});
    this.renderer.setSize(options.width, options.height);
    this.renderer.setPixelRatio(devicePixelRatio);

    this.camera = new THREE.OrthographicCamera(0, options.width, 0, -options.height, 1, 10000);
    this.camera.position.z = 5;

    this.gridX = phina.util.Grid({
      width: options.width,
      columns: options.columns,
    });
    this.gridY = phina.util.Grid({
      width: options.height,
      columns: options.columns,
    });

    this.backgroundColor = (options.backgroundColor !== undefined) ? options.backgroundColor : 'white';

    if (options.fit) this.fitScreen();
  },
  _draw: function() {
    if (this.backgroundColor) {
      this.renderer.setClearColor(new THREE.Color(this.backgroundColor), 1);
    }

    var updateObject = function(obj) {

      obj._calcWorldMatrix && obj._calcWorldMatrix();

      if (obj.visible === false) {
        if(obj.mesh && obj.parent !== this.currentScene) obj.parent.mesh.remove(obj.mesh);
        return;
      }

      if (!obj.mesh) (function recurse(o) {
        if (o.initThreeMesh) {
          o.mesh = o.initThreeMesh();
          o.mesh.initialQuaternion = o.mesh.quaternion.clone();
        } else o.mesh = new THREE.Group();

        if (o.parent === this.currentScene) {
          this.scene.add(o.mesh);
        } else {
          if (!o.parent.mesh) recurse(o.parent);
          o.parent.mesh.add(o.mesh);
        }
      }.bind(this))(obj);

      obj.updateThreeMesh && obj.updateThreeMesh(obj.mesh);

      obj._calcWorldAlpha && obj._calcWorldAlpha();
      if (obj.mesh.material) {
        obj.mesh.material.transparent = obj.className === "phina.display.Label" || obj._worldAlpha !== 1;
        obj.mesh.material.opacity = obj._worldAlpha;
        obj.mesh.quaternion.copy(obj.mesh.initialQuaternion.clone().multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.degToRad(-obj.rotation))));
      }

      obj.mesh.position.set(obj.x, -obj.y, 0);

      if (obj.renderChildBySelf === false && obj.children.length > 0) {
        var tempChildren = obj.children.slice();
        for (var i=0,len=tempChildren.length; i<len; ++i) {
          updateObject(tempChildren[i]);
        }
      }
    }.bind(this);

    if (this.currentScene.children.length > 0) {
      var tempChildren = this.currentScene.children.slice();
      for (var i=0,len=tempChildren.length; i<len; ++i) {
        updateObject(tempChildren[i]);
      }
    }

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
