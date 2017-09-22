phina.display.ThreeApp.prototype.setupEffect = function() {
  var flow = phina.util.Flow.all([
    phina.asset.Script().load("https://threejs.org/examples/js/postprocessing/EffectComposer.js"),
    phina.asset.Script().load("https://threejs.org/examples/js/shaders/CopyShader.js"),
    phina.asset.Script().load("https://threejs.org/examples/js/postprocessing/ShaderPass.js"),
    phina.asset.Script().load("https://threejs.org/examples/js/postprocessing/RenderPass.js")
  ]);
  flow.then(function() {
    this.composer = new THREE.EffectComposer(this.renderer);
    var size = this.renderer.getSize();
    this.composer.setSize(size.width * devicePixelRatio, size.height * devicePixelRatio);
    this.composer.addPass(new THREE.RenderPass(this.scene, this.camera));
    this.render = function() {
      this.composer.passes.each(function(pass) {
        pass.renderToScreen = pass === this.composer.passes.last;
      }, this);
      this.composer.render();
    }.bind(this)
  }.bind(this));
  return flow;
}
