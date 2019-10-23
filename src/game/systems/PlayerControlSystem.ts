import { GamepadComponent,
         CubeCoordinateComponent,
         PositionComponent,
         SizeComponent,
         PlayerStateComponent,
         isTowerMenu,
         InputFocus,
         CameraComponent
       } from '../components'
import Ludic, { Vector2 } from '@ludic/ludic'
import { System, Entity, World, Not } from 'ecsy'
import { QueryType } from '/src/ecsy'
import TowerMenu from '../ui/towerMenu'
import { Hex, vector2_to_cube, cube_to_vector2, CubeCoordinate } from '../utils/Hex'
/**
 * This system is in charge of translating gamepad inputs into
 * player movement.
 */
export default class PlayerControlSystem extends System {
  world!: World

  gamepadDeadzone = 0.3

  queries!: {
    players: QueryType
    playersWithoutFocus: QueryType
    towerMenusWithoutFocus: QueryType
  }

  execute(deltaTime: number) {
    this.queries.players.results.forEach((ent: Entity, ix: number) => {
      const p = ent.getMutableComponent(PositionComponent)
      const size: number = ent.getMutableComponent(SizeComponent).value
      const g = ent.getComponent(GamepadComponent)
      const tileSize: number = size * 3 // Player is 1/3 tileSize
      const currentCube: CubeCoordinateComponent = ent.getComponent(CubeCoordinateComponent)
      const state = ent.getComponent(PlayerStateComponent)
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
            playerVector.y = -gamepad.ly.value
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

          // Update current cube
          const nowCube = vector2_to_cube(new Vector2(p.x, p.y), tileSize)
          if(nowCube.x != currentCube.x || nowCube.z != currentCube.z || nowCube.z != currentCube.z){
            let cube: CubeCoordinateComponent = ent.getMutableComponent(CubeCoordinateComponent)
            cube.x = nowCube.x
            cube.y = nowCube.y
            cube.z = nowCube.z
          }
        }

        if(gamepad.cross.buttonUp){
          // state.building = true
          // create the tower menu and give it player control
          this.world.createEntity()
            .addComponent(InputFocus)
            .addComponent(isTowerMenu)
            .addComponent(GamepadComponent, g)
            .addComponent(PositionComponent, p)
            .addComponent(CubeCoordinateComponent, ent.getComponent(CubeCoordinateComponent))

          ent.removeComponent(InputFocus)
        }
      }
    })

    // whenever a tower menu loses we want to give it back to the player
    this.queries.towerMenusWithoutFocus.added.forEach((ent: Entity) => {
      // find a player without focus and assign focus back
      const gamepadIndex = ent.getComponent(GamepadComponent).index
      const player = this.queries.playersWithoutFocus.results.find((ent: Entity) => ent.getComponent(GamepadComponent).index == gamepadIndex)
      if(player != null){
        player.addComponent(InputFocus)
      }
    })
  }
}

// @ts-ignore
PlayerControlSystem.queries = {
  players: {components: [GamepadComponent, PositionComponent, PlayerStateComponent, InputFocus]},
  playersWithoutFocus: {components: [PlayerStateComponent, GamepadComponent, Not(InputFocus)]},
  towerMenusWithoutFocus: {
    components: [isTowerMenu, GamepadComponent, Not(InputFocus)],
    listen: {
      added: true,
    },
  },
}
