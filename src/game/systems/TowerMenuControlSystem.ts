import {
  GamepadComponent,
  PositionComponent,
  PlayerStateComponent,
  isTowerMenu,
  CameraComponent,
  InputFocusComponent,
  TowerMenuStateComponent,
  CubeCoordinateComponent,
  isTowerComponent,
  TowerTypeComponent
} from '../components'

import Ludic, { Vector2 } from '@ludic/ludic'
import TowerMenu from '../ui/towerMenu'
import { System, Entity, World } from 'ecsy'
import { QueryType } from '/src/ecsy'

export default class TowerMenuControlSystem extends System {

  world!: World
  queries: {
    menus: QueryType
  }

  // TODO: figure out a better way to manage tower types
  towers = [
    {
      type: 'blue',
    },
    {
      type: 'brown',
    },
    {
      type: 'green',
    },
  ]

  execute(){
    this.queries.menus.results.forEach((ent: Entity) => {
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
        const cubeCoord = ent.getComponent(CubeCoordinateComponent)
        this.world.createEntity()
          .addComponent(isTowerComponent)
          .addComponent(CubeCoordinateComponent, cubeCoord)
          .addComponent(TowerTypeComponent, {value: this.towers[index].type})
        this.closeMenu(ent)
      }
    })
  }

  closeMenu(ent: Entity){
    ent.removeComponent(InputFocusComponent)
  }

  moveLeft(ent: Entity){
    const state = ent.getMutableComponent(TowerMenuStateComponent)
    state.index--
    if(state.index < 0){
      state.index = this.towers.length - 1
    }
  }
  moveRight(ent: Entity){
    const state = ent.getMutableComponent(TowerMenuStateComponent)
    state.index++
    if(state.index >= this.towers.length){
      state.index = 0
    }
  }
}

// @ts-ignore
TowerMenuControlSystem.queries = {
  menus: {components: [isTowerMenu, GamepadComponent, InputFocusComponent, TowerMenuStateComponent]}
}
