phina.globalize();

phina.display.CanvasApp.defaults.$extend({
	width: 320, height: 480
});

phina.define('SceneObjects', {
	superClass: 'DisplayElement',
	init: function() {
		this.superInit();
		var threelayer = phina.display.ThreeLayer({x: 160, y: 240, width: 320, height: 480}).addChildTo(this);

		threelayer.scene.add(new THREE.AmbientLight(0x888888));

		threelayer.scene.add(new THREE.Mesh(
      new THREE.IcosahedronGeometry(200),
      new THREE.MeshLambertMaterial({color: 0x44bb44, side: THREE.DoubleSide})
    ));

		RectangleShape({
			x: 160, y: 120
		}).addChildTo(this).on('enterframe', function(e) {
			this.rotation++;
		});

		Label({
			x: 160, y: 240,
			fontSize: 16,
			text: "Hello, phina(may -on-three).js!"
		}).addChildTo(this).on('enterframe', function(e) {
			this.alpha = Math.sin(e.app.frame / 20) * 0.4 + 0.6;
		});

		CircleShape({
			x: 160, y: 360
		}).addChildTo(this).on('enterframe', function(e) {
			this.scaleX = this.scaleY = Math.sin(e.app.frame / 20) * 0.5 + 1.5;
		});
	}
});

phina.define('MainThreeScene', {
	superClass: 'Scene',
	init: function() {
		this.superInit();
		SceneObjects().addChildTo(this);
	},
	onenter: function(e) {
		e.app.composer.addPass(new THREE.GlitchPass());
	}
});

phina.define('MainScene', {
	superClass: 'DisplayScene',
	init: function() {
		this.superInit();
		SceneObjects().addChildTo(this);
	}
});

phina.main(function() {
	var threeapp = ThreeApp({fit: false});
	threeapp.setupEffect().then(function() {
		threeapp.replaceScene(LoadingScene({
			assets: {
				script: {
					gp: "https://threejs.org/examples/js/postprocessing/GlitchPass.js",
					dg: "https://threejs.org/examples/js/shaders/DigitalGlitch.js"
				}
			},
			exitType: 'manual'
		}).on('loaded', function() {
			threeapp.replaceScene(MainThreeScene());
		}));
		threeapp.run();
	});
	var canvasapp = CanvasApp({fit: false});
	canvasapp.replaceScene(MainScene());
	canvasapp.run();
});
