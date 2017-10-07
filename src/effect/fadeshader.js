phina.register('phina.display.three.FadeShader', {
  uniforms: {
    tDiffuse: {value: null},
    color: {value: new THREE.Vector4(0, 0, 0, 0)},
  },

  vertexShader: "varying vec2 vUv;void main() {vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",

  fragmentShader: "uniform vec4 color;uniform sampler2D tDiffuse;varying vec2 vUv;void main() {vec4 texel=texture2D(tDiffuse,vUv);gl_FragColor=vec4(texel.rgb*(1.0-color.a)+color.rgb*color.a,texel.a);}"
});
