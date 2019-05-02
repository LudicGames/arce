import { System } from '@ludic/ein'
import Ludic from '@ludic/ludic'
import Player from '../entities/Player'
import GamepadComponent from '../components/GamepadComponent'
import FillComponent from '../components/FillComponent'

export default class PlayerCreate extends System {

  players = new Map<string, Player>()
  playerColors: {[index: number]: string} = {
    0: 'blue',
    1: 'orange',
    2: 'green',
    3: 'purple',
  }

  constructor(){
    super(100)
  }

  update(){
    // Loop over gamepads until we find a new one, then create a player for it
    Object.entries(Ludic.input.gamepad.state).forEach(([indexKey, gamepad]) => {
      // console.log(indexKey, gamepad.gamepad)
      // check if gamepad exists
      if(gamepad.gamepad != null){
        // check if we already have a player for this index
        if(!this.players.has(indexKey)){
          // create a player
          const player = this.createPlayer(gamepad.gamepad)
          // set the player onto the map and add to engine
          this.players.set(indexKey, player)
          this.engine.addEntity(player)
        }
      }
    })
    // We do not need to process this system too often so we
    // time it out for 500ms
    this.timeout(500)
  }

  timeout(ms: number){
    this.setProcessing(false)
    window.setTimeout(()=>{
      this.setProcessing(true)
    }, ms)
  }
  
  createPlayer(gamepad: Gamepad){
    const player = new Player()
    player.add(new FillComponent(this.playerColors[gamepad.index]))
    player.add(new GamepadComponent(gamepad.index))
    return player
  }
}