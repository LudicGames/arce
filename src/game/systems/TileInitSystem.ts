import { Camera } from '@ludic/ludic'
import { System, World, Entity } from 'ecsy'
import { QueryType } from '/src/ecsy'
import { Map, MapTile } from '../utils/Map'
import { CameraComponent,
         MapConfigComponent,
         isTileComponent,
         TileStateComponent,
         SizeComponent,
         CubeCoordinateComponent,
       } from '../components'

import { side_length_from_area, area_from_side_length, offset_to_cube, OffsetCoordinate, CubeCoordinate } from '../utils/Hex'

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
    const h: number = Math.ceil(camera.height / ptm)
    const w: number = Math.ceil(camera.width / ptm)

    // Try to keep golden monitor ratio of 16:9
    const x_ratio = 16 * (4/3)  // 21.33 - The horizontal distance between adjacent hexagon centers is w * 3/4
    const y_ratio = 9           // Packing ratio is 1:1 for height

    const multiplier = 1.25
    const final_x = 26
    const final_y = 12

    const maxX = 13
    const minX = -13

    const maxY = 6
    const minY = -7

    const tileHeight = h / (final_y - 1)
    const tileWidth = w / (final_x * (3/4))

    let sideLength = tileWidth / 2
    // let sideLength = tileHeight / Math.sqrt(3)

    // console.log(maxY)
    // console.log(minY)

    // console.log("tileHeight", tileHeight)
    // console.log("tileWidth", tileWidth)
    // console.log("sideLength", sideLength)

    // console.log("tileHeight ratio", tileHeight / 9)
    // console.log("tileWidth ratio", tileWidth / 16 * (3/2))


    let actualTiles = 0
    for(let q=minX; q <= maxX; q++){
      for(let r=maxY; r >= minY; r--){
        const cube: CubeCoordinate = offset_to_cube({q, r})
        actualTiles++
        this.world.createEntity()
          .addComponent(isTileComponent)
          .addComponent(TileStateComponent)
          .addComponent(SizeComponent, {value: sideLength})
          .addComponent(CubeCoordinateComponent, cube)
      }
    }

    console.log("actual: ", actualTiles)
    // map.tiles.forEach((tile: MapTile) => {
    //   this.world.createEntity()
    //     .addComponent(isTileComponent)
    //     .addComponent(SizeComponent, {value: sideLength})
    //     .addComponent(CubeCoordinateComponent, tile.coords)
    // })

    this.enabled = false
  }
}

// @ts-ignore
TileInitSystem.queries = {
  map: { components: [MapConfigComponent], mandatory: true},
  camera: { components: [CameraComponent], mandatory: true},
}
