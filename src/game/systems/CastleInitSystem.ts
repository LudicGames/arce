import { Camera } from '@ludic/ludic'
import { System, World, Entity } from 'ecsy'
import { QueryType } from '/src/ecsy'
import { Map, MapCastle } from '../utils/Map'
import { CameraComponent,
         MapConfigComponent,
         isCastleComponent,
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
  }

  execute(deltaTime: number): void {
    const map: Map = this.queries.map.results[0].getComponent(MapConfigComponent).value
    const camera: Camera = this.queries.camera.results[0].getComponent(CameraComponent).value

    const ptm: number = camera.pixelsToMeters
    const mapH: number = Math.ceil(camera.height / ptm)
    const mapW: number = Math.ceil(camera.width / ptm)
    const mapArea: number = mapH * mapW

    // TODO this needs to be relative to Tile size
    const size: number = 2

    map.castles.forEach((castle: MapCastle) => {
      this.world.createEntity()
        .addComponent(isCastleComponent)
        .addComponent(SizeComponent, {value: size})
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
}
