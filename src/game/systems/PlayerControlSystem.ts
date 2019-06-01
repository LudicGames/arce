import { System, Family, Entity, ComponentMapper, IteratingSystem } from '@ludic/ein'
import GamepadComponent from '../components/GamepadComponent';
import PositionComponent from '../components/PositionComponent';
import Ludic, { Vector2 } from '@ludic/ludic';
import PlayerStateComponent from '../components/PlayerStateComponent';
import TileStateComponent from '../components/TileStateComponent';

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

      // player can only move if they are not building
      if(!state.building){
        const playerVector = new Vector2(0,0)
        // Update the position based on gamepad actions
        if(gamepad.lx.value >= this.gamepadDeadzone) {
          playerVector.x = gamepad.lx.value
        } else if(gamepad.lx.value <= -this.gamepadDeadzone) {
          playerVector.x = gamepad.lx.value
        }
        if(gamepad.ly.value >= this.gamepadDeadzone) {
          playerVector.y = -gamepad.ly
        } else if(gamepad.ly.value <= -this.gamepadDeadzone) {
          playerVector.y = -gamepad.ly.value
        }

        // speed boost
        if(gamepad.circle.buttonDown){
          state.boosting = true
        } else if(gamepad.circle.buttonUp){
          state.boosting = false
        }

        // normalize the player vector and apply speed multiplier
        playerVector.scale(state.speed)
        p.x += playerVector.x
        p.y += playerVector.y
      }

      if(state.currentTile != null){
        let tileState = state.currentTile.getComponent(TileStateComponent)
        if(gamepad.cross.buttonUp){
          tileState.building = !tileState.building
          state.building = true
        }
        if(state.building && gamepad.circle.buttonUp){
          tileState.building = false
          state.building = false
        }
      }
    }
  }
}
