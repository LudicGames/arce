import Ludic, { Vector2 } from '@ludic/ludic'
import { System, World, Entity } from '@ludic/ein'
import {
  isEnemyComponent,
  SizeComponent,
  isPlayerComponent,
  HealthComponent,
  CubeCoordinateComponent,
  PositionComponent,
  GamepadComponent,
  PlayerStateComponent,
} from '../components'

import { Hex, CubeCoordinate, OffsetCoordinate, cube_all_neighbors, vector2_to_cube, cube_to_vector2 } from '../utils/Hex'
import { circleCircle } from 'intersects'

export default class PlayerDamageSystem extends System {
  enabled: boolean
  world: World

  queries: {
    enemies: QueryType
    players:  QueryType
  }

  execute(deltaTime: number): void {
    const enemies: Entity[] = this.queries.enemies.results
    if(!enemies.length) return

    const players: Entity[] = this.queries.players.results
    players.forEach((player: Entity) => {
      const pp: PositionComponent = player.getComponent(PositionComponent)
      const ps: SizeComponent = player.getComponent(SizeComponent)
      const state: PlayerStateComponent = player.getComponent(PlayerStateComponent)
      if(state.status == "HURT") return
      enemies.forEach((enemy: Entity) => {
        const ep: PositionComponent = enemy.getComponent(PositionComponent)
        const es: SizeComponent = enemy.getComponent(SizeComponent)

        if(circleCircle(pp.x, pp.y, ps.value, ep.x, ep.y, es.value)) this.onContact(player, enemy)
      })
    })
  }

  onContact(player: Entity, enemy: Entity){
    const g = player.getComponent(GamepadComponent)
    const gamepad = Ludic.input.gamepad.get(g.index)
    gamepad.gamepad.vibrationActuator.playEffect("dual-rumble", {
      duration: 1000, // ms
      startDelay: 0, // ms
      weakMagnitude:   1, // 0..1 (~left)
      strongMagnitude: 1, // 0..1 (~right)
    })
    let ps: PlayerStateComponent = player.getMutableComponent(PlayerStateComponent)
    ps.status = "HURT"
    setTimeout(()=>{
      ps.status = "NORMAL"
    }, 1000)
    // let playerHealth: HealthComponent = player.getMutableComponent(HealthComponent)
    // playerHealth.value--

    // if(playerHealth.value == 0){
    //   var event = new CustomEvent("GAME_OVER", { detail: this });
    //   window.dispatchEvent(event)
    // }
    // enemy.remove()
  }
}

// @ts-ignore
PlayerDamageSystem.queries = {
  enemies: { components: [isEnemyComponent],  mandatory: true },
  players:  { components: [isPlayerComponent], mandatory: true},
}
