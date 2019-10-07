import { Family, Entity, ComponentMapper, IteratingSystem } from '@ludic/ein'
import {
  GamepadComponent,
  PositionComponent,
  PlayerStateComponent,
  TileStateComponent,
  TowerMenuComponent,
  CameraComponent
} from '../components'

import Ludic, { Vector2 } from '@ludic/ludic';
import TowerMenu from '../ui/towerMenu'
import { System } from 'ecsy'

/**
 * This system is in charge of translating gamepad inputs into
 * player movement.
 */
export default class TowerMenuSystem extends System {

  gamepadMapper = new ComponentMapper(GamepadComponent)
  playerStateMapper = new ComponentMapper(PlayerStateComponent)
  towerMenuMapper = new ComponentMapper(TowerMenuComponent)
  positionMapper = new ComponentMapper(PositionComponent)

  gamepadDeadzone = 0.3

  constructor(){
    super()
  }

  processEntity(ent: Entity, deltaTime: number) {
    const { index: gamepadIndex } = this.gamepadMapper.get(ent)
    const state = this.playerStateMapper.get(ent)
    const { component } = this.towerMenuMapper.get(ent)
    const gamepad = Ludic.input.gamepad.get(gamepadIndex)
    const pos = this.positionMapper.get(ent)

    const {camera} = this.engine.getSingletonComponent(CameraComponent)

    if(component.enabled){
      component.position = camera.getPixelPointFromWorldPoint(new Vector2(pos.x, pos.y))
    }

  }
}