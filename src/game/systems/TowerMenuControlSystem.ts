import { Family, Entity, ComponentMapper, IteratingSystem } from '@ludic/ein'
import {
  GamepadComponent,
  PositionComponent,
  PlayerStateComponent,
  TileStateComponent,
  TowerMenuComponent,
  CameraComponent,
  InputFocus
} from '../components'

import Ludic, { Vector2 } from '@ludic/ludic';
import TowerMenu from '../ui/towerMenu'
import { System } from 'ecsy'
import { UIComponent } from '@ludic/ludic-ui';
import { QueryType } from '/src/ecsy';

/**
 * This system is in charge of translating gamepad inputs into
 * player movement.
 */
export default class TowerMenuSystem extends System {

  // processEntity(ent: Entity, deltaTime: number) {
  //   const { index: gamepadIndex } = this.gamepadMapper.get(ent)
  //   const state = this.playerStateMapper.get(ent)
  //   const { component } = this.towerMenuMapper.get(ent)
  //   const gamepad = Ludic.input.gamepad.get(gamepadIndex)
  //   const pos = this.positionMapper.get(ent)

  //   const {camera} = this.engine.getSingletonComponent(CameraComponent)

  //   if(component.enabled){
  //     component.position = camera.getPixelPointFromWorldPoint(new Vector2(pos.x, pos.y))
  //   }

  // }

  queries: {
    menus: QueryType
  }
  
  execute(){
    this.queries.menus.results.forEach(ent => {
      const g = ent.getComponent(GamepadComponent)
      const gamepad = Ludic.input.gamepad.get(g.index)

      if(gamepad.circle.buttonUp){
        ent.removeComponent(InputFocus)
      }
    })
  }
}

// @ts-ignore
TowerMenuSystem.queries = {
  menus: {components: [TowerMenuComponent, GamepadComponent, InputFocus]}
}
