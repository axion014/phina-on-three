phina.namespace(function() {
  function getColor(str) {
    return str ? phina.util.Color().setFromString(str) : phina.util.Color(0, 0, 0, 0);
  }

  phina.display.RectangleShape.prototype.$extend({
    initThreeMesh: function() {
      var group = new THREE.Group();
      var geometry = new THREE.PlaneBufferGeometry(1, 1);
      group.fill = new THREE.Mesh(
        geometry,
        new THREE.MeshBasicMaterial({side: THREE.DoubleSide})
      );
      group.fill.position.z = 1;
      group.stroke = new THREE.Mesh(
        geometry,
        new THREE.MeshBasicMaterial()
      );
      group.add(group.stroke);
      group.add(group.fill);
      return group;
    },
    updateThreeMesh: function(group) {
      var color = getColor(this.fill);
      group.fill.material.color = new THREE.Color(color.r, color.g, color.b);
      group.fill.material.opacity = color.a;
      group.fill.scale.set(this.width * this.scaleX, this.height * this.scaleY, 1);
      var color = getColor(this.stroke);
      group.stroke.material.color = new THREE.Color(color.r, color.g, color.b);
      group.stroke.material.opacity = color.a;
      group.stroke.scale.set((1 + this.strokeWidth / this.width) * this.width * this.scaleX, (1 +   this.strokeWidth / this.height) * this.height * this.scaleY, 1);
    }
  });

  phina.display.CircleShape.prototype.$extend({
    initThreeMesh: function() {
      var group = new THREE.Group();
      var geometry = new THREE.CircleBufferGeometry(1, 128);
      group.fill = new THREE.Mesh(
        geometry,
        new THREE.MeshBasicMaterial({side: THREE.DoubleSide})
      );
      group.fill.position.z = 1;
      group.stroke = new THREE.Mesh(
        geometry,
        new THREE.MeshBasicMaterial()
      );
      group.add(group.stroke);
      group.add(group.fill);
      return group;
    },
    updateThreeMesh: function(group) {
      var color = getColor(this.fill);
      group.fill.material.color = new THREE.Color(color.r, color.g, color.b);
      group.fill.material.opacity = color.a;
      group.fill.scale.set(this.radius * this.scaleX, this.radius * this.scaleY, 1);
      var color = getColor(this.stroke);
      group.stroke.material.color = new THREE.Color(color.r, color.g, color.b);
      group.stroke.material.opacity = color.a;
      var w = 1 + this.strokeWidth / this.radius / 2;
      group.stroke.scale.set(w * this.radius * this.scaleX, w * this.radius * this.scaleY, 1);
    }
  });

  phina.display.Label.prototype.$extend({
    initThreeMesh: function() {
      return new THREE_text2d.MeshText2D(this.text || " ", {
        align: THREE_text2d.textAlign[this.align].clone().add(new THREE.Vector2(0, 0.5)),
        font: this.font,
        fillStyle: this.fill
      });
    },
    updateThreeMesh: function(mesh) {
      mesh.align = THREE_text2d.textAlign[this.align].clone().add(new THREE.Vector2(0, 0.5));
      mesh.text = this.text || " ";
      mesh.font = this.font;
      mesh.fillStyle = this.fill;
      mesh.scale.set(this.scaleX, this.scaleY, 1);
    }
  });

  phina.display.ThreeLayer.prototype.$extend({
    initThreeMesh: function() {
      this.renderTarget = new THREE.WebGLRenderTarget(this.width * this.scaleX * devicePixelRatio,   this.height * this.scaleY * devicePixelRatio, {});
      return new THREE.Mesh(
        new THREE.PlaneBufferGeometry(1, 1),
        new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide, map:   this.renderTarget.texture})
      );
    },
    updateThreeMesh: function(mesh, app) {
      var tmpClearColor = app.renderer.getClearColor();
      app.renderer.setClearColor(this.renderer.getClearColor());
      app.renderer.render(this.scene, this.camera, this.renderTarget);
      app.renderer.setClearColor(tmpClearColor);
      mesh.scale.set(this.width * this.scaleX, this.height * this.scaleY, 1);
    }
  });
});
