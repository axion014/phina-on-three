phina.display.RectangleShape.prototype.$extend({
  initThreeMesh: function() {
    var geometry = new THREE.PlaneBufferGeometry(1, 1);
    var mesh = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({side: THREE.DoubleSide})
    );
    mesh.edge = new THREE.LineSegments(
      new THREE.EdgesGeometry(geometry),
      new THREE.LineBasicMaterial()
    );
    mesh.add(mesh.edge);
    return mesh;
  },
  updateThreeMesh: function(mesh) {
    mesh.scale.set(this.width * this.scaleX, this.height * this.scaleY, 1);
    mesh.material.color = new THREE.Color(this.fill);
    mesh.edge.material.color = new THREE.Color(this.stroke);
    mesh.edge.material.linewidth = this.strokeWidth / 2;
  }
});

phina.display.CircleShape.prototype.$extend({
  initThreeMesh: function() {
    var geometry = new THREE.CircleGeometry(1, 128);
    var mesh = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({side: THREE.DoubleSide})
    );
    mesh.edge = new THREE.LineSegments(
      new THREE.EdgesGeometry(geometry),
      new THREE.LineBasicMaterial()
    );
    mesh.add(mesh.edge);
    return mesh;
  },
  updateThreeMesh: function(mesh) {
    mesh.scale.set(this.radius * this.scaleX, this.radius * this.scaleY, 1);
    mesh.material.color = new THREE.Color(this.fill);
    mesh.edge.material.color = new THREE.Color(this.stroke);
    mesh.edge.material.linewidth = this.strokeWidth / 2;
  }
});

phina.display.Label.prototype.$extend({
  initThreeMesh: function() {
    return new THREE_text2d.MeshText2D(this.text, {
      align: THREE_text2d.textAlign[this.align].add(new THREE.Vector2(0, 0.5)),
      font: this.font,
      fillStyle: this.fill
    });
  },
  updateThreeMesh: function(mesh) {
    mesh.align = THREE_text2d.textAlign[this.align].add(new THREE.Vector2(0, 0.5));
    mesh.text = this.text;
    mesh.font = this.font;
    mesh.fillStyle = this.fill;
    mesh.scale.set(this.scaleX, this.scaleY, 1);
  }
});
