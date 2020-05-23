/** @type {import('vite').ServerConfig} */
module.exports = {
  port: 8080,
  alias: {
    '@ludic/ludic': '@ludic/ludic/dist/ludic.es.js',
    'three': 'three/build/three.module.js',
  },
}