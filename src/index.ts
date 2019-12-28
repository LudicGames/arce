import Game from '/src/game/game'
import * as Comlink from 'comlink'

const uiWorker = new Worker('./game/worker.ts')
const proxy = Comlink.wrap(uiWorker)

new Game({
  el: '#game',
  workers: {
    ui: {
      worker: uiWorker,
      value: proxy,
      passCanvas: true,
    },
  },
}).start()