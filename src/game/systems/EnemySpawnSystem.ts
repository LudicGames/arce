import { Camera, Vector2 } from '@ludic/ludic'
import { System, World, Entity } from 'ecsy'
import { QueryType } from '/src/ecsy'
import { Map, MapTile } from '../utils/Map'
import { PositionComponent,
         MovementComponent,
         isTileComponent,
         isEnemyComponent,
         SizeComponent,
         SpeedComponent,
         DestinationCubeComponent,
         PreviousCubeComponent,
         EnemyConfigComponent
       } from '../components'

import { Hex, CubeCoordinate, OffsetCoordinate, cube_all_neighbors, vector2_to_cube, cube_to_vector2 } from '../utils/Hex'

export default class EnemySpawnSystem extends System {
  enabled: boolean
  world: World

  queries: {
    enemyConfig: QueryType
    tiles:  QueryType

  }

  spawns = [1, 2, 3, 4, 5]

  execute(deltaTime: number, time: number): void {
    const enemyConfig: Map = this.queries.enemyConfig.results[0].getComponent(EnemyConfigComponent).value
    const tileSize: number = this.queries.tiles.results[0].getComponent(SizeComponent).value

    // Just spawn a random enemy every 10 seconds
    if(this.spawns.indexOf(Math.round(time / 5000)) > -1){
      this.spawnRandomEnemy(tileSize)
      this.spawns.splice(0, 1)
    }
  }

  spawnRandomEnemy(tileSize: number){
    let pos: Vector2 = new Vector2(-tileSize * 8, tileSize * 5)
    let cube: CubeCoordinate = vector2_to_cube(pos, tileSize)
    this.world.createEntity()
      .addComponent(PositionComponent, pos)
      .addComponent(MovementComponent)
      .addComponent(SizeComponent, {value: .5})
      .addComponent(SpeedComponent, {value: .1})
      .addComponent(DestinationCubeComponent, cube)
      .addComponent(PreviousCubeComponent, cube)
      .addComponent(isEnemyComponent)
  }
}


// @ts-ignore
EnemySpawnSystem.queries = {
  enemyConfig: { components: [EnemyConfigComponent], mandatory: true},
  tiles:  { components: [isTileComponent], mandatory: true},
}
