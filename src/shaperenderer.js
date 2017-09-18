phina.display.RectangleShape.prototype.$extend({
	initThreeMesh: function() {
		return new THREE.Mesh(
			new THREE.PlaneGeometry(1, 1),
			new THREE.MeshBasicMaterial({color: this.fill, side: THREE.DoubleSide})
		);
	},
	updateThreeMesh: function(mesh) {
		mesh.position.set(this.x, this.y, 0);
		mesh.rotateZ(Math.degToRad(this.rotation));
		mesh.scale.set(this.width * this.scaleX, this.height * this.scaleY, 1);
		mesh.material.color = new THREE.Color(this.fill);
	}
});
