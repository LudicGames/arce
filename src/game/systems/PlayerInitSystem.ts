import { Camera } from '@ludic/ludic'
import { System, World, Entity } from 'ecsy'
import { QueryType } from '/src/ecsy'
import { Map, MapTile } from '../utils/Map'
import { CameraComponent,
         MapConfigComponent,
         PlayerConfigComponent,
         isPlayerComponent,
         isTileComponent,
         PositionComponent,
         MovementComponent,
         PlayerStateComponent,
         SizeComponent,
         GamepadComponent,
         InputFocus,
         MechComponent
       } from '../components'
import { Hex, cubeCoordinateToVector2, CubeCoordinate } from '../utils/Hex'


export default class PlayerInitSystem extends System {
  enabled: boolean
  world: World

  queries: {
    playerConfig: QueryType
    mapConfig: QueryType
    camera: QueryType
    tiles:  QueryType
  }

  execute(deltaTime: number): void {
    const playerConfig = this.queries.playerConfig.results[0].getComponent(PlayerConfigComponent).value
    const mapConfig: Map = this.queries.mapConfig.results[0].getComponent(MapConfigComponent).value
    const camera: Camera = this.queries.camera.results[0].getComponent(CameraComponent).value
    const tileSize: number = this.queries.tiles.results[0].getComponent(SizeComponent).value

    Object.entries(playerConfig).forEach(([index, type]) => {
      let spawnPoint = {x: 0, y: 0}
      if(mapConfig.playerSpawnPoints.length > parseInt(index)){
        let coords = mapConfig.playerSpawnPoints[parseInt(index)]
        spawnPoint = cubeCoordinateToVector2({x: coords.x, y: coords.y, z: coords.z}, tileSize)
      }

      const player = this.world.createEntity()
      player.addComponent(PositionComponent, spawnPoint)
      player.addComponent(MovementComponent)
      player.addComponent(PlayerStateComponent)
      player.addComponent(GamepadComponent, {index: parseInt(index)})
      player.addComponent(InputFocus)
      player.addComponent(MechComponent, {type})
    })


    this.enabled = false
  }
}

// @ts-ignore
PlayerInitSystem.queries = {
  playerConfig: { components: [PlayerConfigComponent], mandatory: true},
  mapConfig: { components: [MapConfigComponent], mandatory: true},
  camera: { components: [CameraComponent], mandatory: true},
  tiles:  { components: [isTileComponent], mandatory: true},
}
