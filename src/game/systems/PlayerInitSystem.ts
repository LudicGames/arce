import { Camera } from '@ludic/ludic'
import { System, World, Entity } from 'ecsy'
import { QueryType } from '/src/ecsy'
import { Map, MapTile } from '../utils/Map'
import { CameraComponent,
         MapConfigComponent,
         PlayerConfigComponent,
         isPlayerComponent,
         PositionComponent,
         MovementComponent,
         PlayerStateComponent,
         GamepadComponent,
         InputFocus,
         MechComponent
       } from '../components'

export default class PlayerInitSystem extends System {
  enabled: boolean
  world: World

  queries: {
    playerConfig: QueryType
    mapConfig: QueryType
    camera: QueryType
  }

  execute(deltaTime: number): void {
    const playerConfig = this.queries.playerConfig.results[0].getComponent(PlayerConfigComponent).value
    const mapConfig: Map = this.queries.mapConfig.results[0].getComponent(MapConfigComponent).value
    const camera: Camera = this.queries.camera.results[0].getComponent(CameraComponent).value


    Object.entries(playerConfig).forEach(([index, type]) => {
      // let spawnPoint = mapConfig.playerSpawnPoints[parseInt(index)]
      // let hex = new Hex(spawnPoint.x, spawnPoint.y, spawnPoint.z, hexSideLength)
      const player = this.world.createEntity()
      player.addComponent(PositionComponent, {x: 10, y: 10})
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
}
