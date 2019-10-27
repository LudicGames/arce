import { Vector2 } from '@ludic/ludic'
import { System, World, Entity } from 'ecsy'
import { QueryType } from '/src/ecsy'
import {
  isEnemyComponent,
  SizeComponent,
  isPlayerComponent,
  HealthComponent,
  CubeCoordinateComponent,
  PositionComponent,
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
      const playerPosition: PositionComponent = player.getComponent(PositionComponent)
      const playerSize: SizeComponent = player.getComponent(SizeComponent)

      enemies.forEach((enemy: Entity) => {
        const enemyPosition: PositionComponent = enemy.getComponent(PositionComponent)
        const enemySize: SizeComponent = enemy.getComponent(SizeComponent)


      })
    })
  }

  onContact(player: Entity, enemy: Entity){
    console.log("contact")
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
