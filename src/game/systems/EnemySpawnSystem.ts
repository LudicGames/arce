import { Camera } from '@ludic/ludic'
import { System, World, Entity } from 'ecsy'
import { QueryType } from '/src/ecsy'
import { Map, MapTile } from '../utils/Map'
import { PositionComponent,
         MovementComponent,
         isTileComponent,
         isEnemyComponent,
         SizeComponent,
         EnemyConfigComponent
       } from '../components'

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
      this.spawnRandomEnemy()
      this.spawns.splice(0, 1)
    }
  }

  spawnRandomEnemy(){
    this.world.createEntity()
      .addComponent(PositionComponent, {x: 10, y: 10})
      .addComponent(MovementComponent)
      .addComponent(SizeComponent, {value: .5})
      .addComponent(isEnemyComponent)
  }
}


// @ts-ignore
EnemySpawnSystem.queries = {
  enemyConfig: { components: [EnemyConfigComponent], mandatory: true},
  tiles:  { components: [isTileComponent], mandatory: true},
}
