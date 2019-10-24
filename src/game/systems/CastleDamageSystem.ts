import { System, World, Entity } from 'ecsy'
import { QueryType } from '/src/ecsy'
import {
  isEnemyComponent,
  SizeComponent,
  isCastleComponent,
  HealthComponent,
  CubeCoordinateComponent,
} from '../components'

import { Hex, CubeCoordinate, OffsetCoordinate, cube_all_neighbors, vector2_to_cube, cube_to_vector2 } from '../utils/Hex'

export default class CastleDamageSystem extends System {
  enabled: boolean
  world: World

  queries: {
    enemies: QueryType
    castles:  QueryType
  }

  execute(deltaTime: number): void {
    const enemies: Entity[] = this.queries.enemies.changed
    if(!enemies.length) return

    const castles: Entity[] = this.queries.castles.results
    castles.forEach((castle: Entity) => {
      const castleCube: CubeCoordinateComponent = castle.getComponent(CubeCoordinateComponent)
      enemies.forEach((enemy: Entity) => {
        const enemyCube: CubeCoordinateComponent = enemy.getComponent(CubeCoordinateComponent)

        if(castleCube.x == enemyCube.x && castleCube.y == enemyCube.y && castleCube.z == enemyCube.z){
          this.onEnemyContact(castle, enemy)
        }
      })
    })
  }

  onEnemyContact(castle: Entity, enemy: Entity){
    let castleHealth: HealthComponent = castle.getMutableComponent(HealthComponent)
    castleHealth.value--

    if(castleHealth.value == 0){
      var event = new CustomEvent("GAME_OVER", { detail: this });
      window.dispatchEvent(event)
    }
    enemy.remove()
  }
}

// @ts-ignore
CastleDamageSystem.queries = {
  enemies: {
    components: [isEnemyComponent, CubeCoordinateComponent],
    listen: {
      changed: [ CubeCoordinateComponent ]
    },
    mandatory: true
  },
  castles:  { components: [isCastleComponent], mandatory: true},
}
