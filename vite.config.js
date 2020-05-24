/** @type {import('vite').ServerConfig} */
module.exports = {
  port: 8080,
  alias: {
    '@ludic/ludic': '@ludic/ludic/dist/ludic.es.js',
    'three': 'three/build/three.module.js',
    // these utils are in examples and not src for unknown reasons so alias them for ease of use.
    // also aliased in tsconfig.json
    'three/BufferGeometryUtils': 'three/examples/jsm/utils/BufferGeometryUtils.js',
    'three/WebGL': 'three/examples/jsm/WebGL.js',
  },
}