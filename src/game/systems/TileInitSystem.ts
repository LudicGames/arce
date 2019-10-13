import { Camera } from '@ludic/ludic'
import { System, World, Entity } from 'ecsy'
import { QueryType } from '/src/ecsy'
import { Map, MapTile } from '../utils/Map'
import { CameraComponent,
         MapConfigComponent,
         isTileComponent,
         SizeComponent,
         CubeCoordinateComponent,
       } from '../components'

export default class TileInitSystem extends System {
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

    const totalXTiles: number = 23
    const totalYTiles: number = 13
    const totalTiles: number =  totalXTiles * totalYTiles // 144

    const w: number = totalXTiles * 1.5
    const hexSideLength: number = mapW / w

    // const minQ: number = 1
    // const maxQ: number = 22

    // const minR: number = -9
    // const maxR: number = -2

    map.tiles.forEach((tile: MapTile) => {
      this.world.createEntity()
        .addComponent(isTileComponent)
        .addComponent(SizeComponent, {value: hexSideLength})
        .addComponent(CubeCoordinateComponent, tile.coords)
    })

    // this System only runs once
    this.enabled = false
  }
}

// @ts-ignore
TileInitSystem.queries = {
  map: { components: [MapConfigComponent], mandatory: true},
  camera: { components: [CameraComponent], mandatory: true},
}
