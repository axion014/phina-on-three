phina.display.ThreeApp.prototype.setupEffect = function() {
  var flow = phina.asset.Script().load("https://threejs.org/examples/js/postprocessing/EffectComposer.js").then(function() {
    return phina.util.Flow.all([
      phina.asset.Script().load("https://threejs.org/examples/js/shaders/CopyShader.js"),
      phina.asset.Script().load("https://threejs.org/examples/js/postprocessing/ShaderPass.js"),
      phina.asset.Script().load("https://threejs.org/examples/js/postprocessing/RenderPass.js")
    ]);
  });
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
    }.bind(this);
    this.on('changescene', function() {
      this.composer.passes = [this.composer.passes[0]];
    }.bind(this));
  }.bind(this));
  return flow;
}

phina.register('phina.display.three.FadeShader', {
  uniforms: {
    tDiffuse: {value: null},
    color: {value: new THREE.Vector4(0, 0, 0, 0)},
  },

  vertexShader: "varying vec2 vUv;void main() {vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",

  fragmentShader: "uniform vec4 color;uniform sampler2D tDiffuse;varying vec2 vUv;void main() {vec4 texel=texture2D(tDiffuse,vUv);gl_FragColor=vec4(texel.rgb*(1.0-color.a)+color.rgb*color.a,texel.a);}"
});
