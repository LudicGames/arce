// import { Family, Entity, ComponentMapper, IteratingSystem, ComponentType } from '@ludic/ein'
import { GamepadComponent, PositionComponent, PlayerStateComponent, TileStateComponent, TowerMenuComponent, InputFocus } from '../components'
import Ludic, { Vector2 } from '@ludic/ludic'
import { System, Entity, World, Not } from 'ecsy'
import { QueryType } from '/src/ecsy'
import TowerMenu from '../ui/towerMenu'

/**
 * This system is in charge of translating gamepad inputs into
 * player movement.
 */
export default class PlayerControlSystem extends System {

  // positionMapper = new ComponentMapper(PositionComponent)
  // gamepadMapper = new ComponentMapper(GamepadComponent)
  // playerStateMapper = new ComponentMapper(PlayerStateComponent)
  // towerMenuMapper = new ComponentMapper(TowerMenuComponent)

  world!: World

  gamepadDeadzone = 0.3

  queries!: {
    players: QueryType
    playersWithoutFocus: QueryType
    towerMenusWithoutFocus: QueryType
  }

  // constructor(){
  //   super(Family.all([GamepadComponent, PositionComponent, PlayerStateComponent]).get())
  // }

  execute(deltaTime: number) {
    this.queries.players.results.forEach((ent: Entity, ix) => {
      const p = ent.getComponent(PositionComponent)
      const g = ent.getComponent(GamepadComponent)
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
        }

        if(gamepad.cross.buttonUp){
          // state.building = true
          // create the tower menu and give it player control
          
          this.world.createEntity().addComponent(InputFocus).addComponent(TowerMenuComponent).addComponent(GamepadComponent, g).addComponent(PositionComponent, p)
          ent.removeComponent(InputFocus)
          // ent.addComponent(TowerMenuComponent)
          // const {component} = this.towerMenuMapper.get(ent) || ent.addAndReturn(new TowerMenuComponent())
          // component.visible = true
        }
        // if(state.building && gamepad.circle.buttonUp){
        //   state.building = false
        //   ent.removeComponent(TowerMenuComponent)
        //   // const {component} = this.towerMenuMapper.get(ent)
        //   // component.visible = false
        // }
      }
    })

    // whenever a tower menu loses we want to give it back to the player
    this.queries.towerMenusWithoutFocus.added.forEach(ent => {
      // find a player without focus and assign focus back
      console.log('return focus')
      const gamepadIndex = ent.getComponent(GamepadComponent).index
      const player = this.queries.playersWithoutFocus.results.find(ent => ent.getComponent(GamepadComponent).index == gamepadIndex)
      if(player != null){
        console.log('add input focus to player')
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
    components: [TowerMenuComponent, GamepadComponent, Not(InputFocus)],
    listen: {
      added: true,
    },
  },
}
