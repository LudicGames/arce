import Game from '/src/game/game'

import LudicUI from 'ludic-ui'
import {render} from '/src/game/ui/litRenderer'


new Game({
  el: '#game',
  plugins: [
    LudicUI({render})
  ],
}).start()