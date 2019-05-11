import { System, Family, Entity, ComponentMapper, IteratingSystem } from '@ludic/ein'
import GamepadComponent from '../components/GamepadComponent';
import PositionComponent from '../components/PositionComponent';
import Ludic, { Vector2 } from '@ludic/ludic';
import PlayerStateComponent from '../components/PlayerStateComponent';

/**
 * This system is in charge of translating gamepad inputs into
 * player movement.
 */
export default class PlayerControlSystem extends IteratingSystem {

  positionMapper = new ComponentMapper(PositionComponent)
  gamepadMapper = new ComponentMapper(GamepadComponent)
  playerStateMapper = new ComponentMapper(PlayerStateComponent)

  gamepadDeadzone = 0.3

  constructor(){
    super(Family.all([GamepadComponent, PositionComponent, PlayerStateComponent]).get())
  }

  processEntity(ent: Entity, deltaTime: number) {
    const p = this.positionMapper.get(ent)
    const g = this.gamepadMapper.get(ent)
    const state = this.playerStateMapper.get(ent)
    const gamepad = Ludic.input.gamepad.get(g.index)
    
    if(p){
      const playerVector = new Vector2(0,0)
      // Update the position based on gamepad actions
      if(gamepad.lx >= this.gamepadDeadzone) {
        playerVector.x = gamepad.lx
      } else if(gamepad.lx <= -this.gamepadDeadzone) {
        playerVector.x = gamepad.lx
      }
      if(gamepad.ly >= this.gamepadDeadzone) {
        playerVector.y = -gamepad.ly
      } else if(gamepad.ly <= -this.gamepadDeadzone) {
        playerVector.y = -gamepad.ly
      }

      if(gamepad.cross.pressed && !state.vibrating) {
        // @ts-ignore - chrome uses this key instead of hapticActuator
        if(gamepad.gamepad.vibrationActuator != null){
          state.vibrating = true
          // @ts-ignore
          gamepad.vibrate({
            duration: 150,
            strongMagnitude: 0.0,
            weakMagnitude: 1.0
          }).then(()=>{
            state.vibrating = false
          })
        }
      }
      // normalize the player vector and apply speed multiplier
      playerVector.scale(state.speed)
      p.x += playerVector.x
      p.y += playerVector.y
    }
  }
}