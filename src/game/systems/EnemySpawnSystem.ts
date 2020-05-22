import { Camera, Vector2 } from '@ludic/ludic'
import { System, World, Entity } from '@ludic/ein'

import { Map, MapTile } from '../utils/Map'
import { PositionComponent,
         isTileComponent,
         isEnemyComponent,
         SizeComponent,
         SpeedComponent,
         DestinationCubeComponent,
         CameraComponent,
         PreviousCubeComponent,
         CubeCoordinateComponent,
         EnemyConfigComponent
       } from '../components'

import { Hex, CubeCoordinate, OffsetCoordinate, cube_all_neighbors, vector2_to_cube, cube_to_vector2 } from '../utils/Hex'

export default class EnemySpawnSystem extends System {
  enabled: boolean
  world: World

  queries: {
    enemyConfig: QueryType
    tiles:  QueryType
    camera: QueryType
  }

  spawning = false

  execute(deltaTime: number, time: number): void {
    const enemyConfig: Map = this.queries.enemyConfig.results[0].getComponent(EnemyConfigComponent).value
    const tileSize: number = this.queries.tiles.results[0].getComponent(SizeComponent).value
    const camera: Camera = this.queries.camera.results[0].getComponent(CameraComponent).value
    const ptm: number = camera.pixelsToMeters
    const h: number = Math.ceil(camera.height / ptm)
    const w: number = Math.ceil(camera.width / ptm)

    // Just spawn a random enemy every 3 second
    if(!this.spawning){
      this.spawning = true
      setTimeout(()=>{
        const x = this.rand(-w/2, w/2)
        const y = this.rand(-h/2, h/2)

        this.spawnRandomEnemy(tileSize, x, y)
        this.spawning = false
      }, 3000)
    }
  }

  spawnRandomEnemy(tileSize: number, x: number, y: number){
    let pos: Vector2 = new Vector2(x, y)
    let cube: CubeCoordinate = vector2_to_cube(pos, tileSize)
    this.world.createEntity()
      .addComponent(PositionComponent, pos)
      .addComponent(SizeComponent, {value: tileSize / 3})
      .addComponent(SpeedComponent, {value: .1})
      .addComponent(CubeCoordinateComponent, cube)
      .addComponent(DestinationCubeComponent, cube)
      .addComponent(PreviousCubeComponent, cube)
      .addComponent(isEnemyComponent)
  }

  rand(min: number, max: number) {
    return Math.random() * (max - min) + min
  }
}


// @ts-ignore
EnemySpawnSystem.queries = {
  enemyConfig: { components: [EnemyConfigComponent], mandatory: true},
  tiles:  { components: [isTileComponent], mandatory: true},
  camera: { components: [CameraComponent], mandatory: true},
}
