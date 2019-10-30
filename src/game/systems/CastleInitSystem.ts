import { Camera } from '@ludic/ludic'
import { System, World, Entity } from 'ecsy'
import { QueryType } from '/src/ecsy'
import { Map, MapCastle } from '../utils/Map'
import { CameraComponent,
         MapConfigComponent,
         isCastleComponent,
         isTileComponent,
         SizeComponent,
         HealthComponent,
         CubeCoordinateComponent,
       } from '../components'

export default class CastleInitSystem extends System {
  enabled: boolean
  world: World

  queries: {
    map: QueryType
    camera: QueryType
    tiles: QueryType
  }

  execute(deltaTime: number): void {
    const map: Map = this.queries.map.results[0].getComponent(MapConfigComponent).value
    const camera: Camera = this.queries.camera.results[0].getComponent(CameraComponent).value

    const ptm: number = camera.pixelsToMeters
    const mapH: number = Math.ceil(camera.height / ptm)
    const mapW: number = Math.ceil(camera.width / ptm)
    const mapArea: number = mapH * mapW

    const tileSize: number = this.queries.tiles.results[0].getComponent(SizeComponent).value
    const size: number = tileSize

    map.castles.forEach((castle: MapCastle) => {
      this.world.createEntity()
        .addComponent(isCastleComponent)
        .addComponent(SizeComponent, {value: size})
        .addComponent(HealthComponent, {value: 10})
        .addComponent(CubeCoordinateComponent, castle.coords)
    })

    // this System only runs once
    this.enabled = false
  }
}

// @ts-ignore
CastleInitSystem.queries = {
  map: { components: [MapConfigComponent], mandatory: true},
  camera: { components: [CameraComponent], mandatory: true},
  tiles:  { components: [isTileComponent], mandatory: true},
}
