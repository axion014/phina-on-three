phina.globalize();

phina.define('MainScene', {
	superClass: 'Scene',
	init: function() {
		this.superInit();
	}
});

phina.main(function() {
	var app = ThreeApp({});
	app.replaceScene(MainScene());
	app.run();
});
