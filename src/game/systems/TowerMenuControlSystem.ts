import { Family, Entity, ComponentMapper, IteratingSystem } from '@ludic/ein'
import {
  GamepadComponent,
  PositionComponent,
  PlayerStateComponent,
  TileStateComponent,
  isTowerMenu,
  CameraComponent,
  InputFocus,
  TowerMenuStateComponent
} from '../components'

import Ludic, { Vector2 } from '@ludic/ludic'
import TowerMenu from '../ui/towerMenu'
import { System, Entity, Entity } from 'ecsy'
import { UIComponent } from '@ludic/ludic-ui'
import { QueryType } from '/src/ecsy'

export default class TowerMenuControlSystem extends System {

  queries: {
    menus: QueryType
  }

  totalTowers = 3
  
  execute(){
    this.queries.menus.results.forEach(ent => {
      const g = ent.getComponent(GamepadComponent)
      const gamepad = Ludic.input.gamepad.get(g.index)

      if(gamepad.circle.buttonUp){
        this.closeMenu(ent)
      } else if(gamepad.left.buttonDown){
        this.moveLeft(ent)
      } else if(gamepad.right.buttonDown){
        this.moveRight(ent)
      } else if(gamepad.cross.buttonUp){
        const { index } = ent.getComponent(TowerMenuStateComponent)
        console.log('create tower', index)
        this.closeMenu(ent)
      }
    })
  }

  closeMenu(ent: Entity){
    ent.removeComponent(InputFocus)
  }

  moveLeft(ent: Entity){
    const state = ent.getMutableComponent(TowerMenuStateComponent)
    state.index--
    if(state.index < 0){
      state.index = this.totalTowers - 1
    }
  }
  moveRight(ent: Entity){
    const state = ent.getMutableComponent(TowerMenuStateComponent)
    state.index++
    if(state.index >= this.totalTowers){
      state.index = 0
    }
  }
}

// @ts-ignore
TowerMenuControlSystem.queries = {
  menus: {components: [isTowerMenu, GamepadComponent, InputFocus, TowerMenuStateComponent]}
}
