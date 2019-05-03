import { System, Family, Entity, ComponentMapper, IteratingSystem } from '@ludic/ein'
import GamepadComponent from '../components/GamepadComponent';
import PositionComponent from '../components/PositionComponent';
import Ludic from '@ludic/ludic';

/**
 * This system is in charge of translating gamepad inputs into
 * player movement.
 */
export default class PlayerControlSystem extends IteratingSystem {

  positionMapper = new ComponentMapper(PositionComponent)
  gamepadMapper = new ComponentMapper(GamepadComponent)

  gamepadDeadzone = 0.3

  constructor(){
    super(Family.all([GamepadComponent, PositionComponent]).get())
  }

  processEntity(ent: Entity, deltaTime: number) {
    const p: PositionComponent = this.positionMapper.get(ent)
    const g: GamepadComponent = this.gamepadMapper.get(ent)
    const gamepad = Ludic.input.gamepad.get(g.index)
    
    if(p){
      // Update the position based on gamepad actions
      if(gamepad.lx >= this.gamepadDeadzone) {
        p.x += 0.2
      } else if(gamepad.lx <= -this.gamepadDeadzone) {
        p.x -= 0.2
      }
      if(gamepad.ly >= this.gamepadDeadzone) {
        p.y -= 0.2
      } else if(gamepad.ly <= -this.gamepadDeadzone) {
        p.y += 0.2
      }
    }
  }
}