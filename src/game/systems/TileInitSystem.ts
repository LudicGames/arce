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
    const area: number = h * w

    const totalTiles: number = 250
    const tileArea: number = area / totalTiles
    const sideLength: number = side_length_from_area(tileArea)

    // console.log("area: ", area)
    // console.log("tileArea: ", tileArea)
    // console.log("sideLength: ", sideLength)

    let tileH = Math.sqrt(3) * sideLength
    let tileW = sideLength * 2
    let maxX = Math.ceil(w / (tileW * (3/4) + tileW)) + 1
    let maxY = Math.ceil((h / tileH) / 2)

    // console.log("maxX", maxX)
    // console.log("maxY", maxY)

    let actualTiles = 0
    for(let q=-maxX; q <= maxX; q++){
      for(let r=maxY; r >= -maxY; r--){
        const cube: CubeCoordinate = offset_to_cube({q, r})
        actualTiles++
        this.world.createEntity()
          .addComponent(isTileComponent)
          .addComponent(TileStateComponent)
          .addComponent(SizeComponent, {value: sideLength})
          .addComponent(CubeCoordinateComponent, cube)
      }
    }

    // console.log("actual: ", actualTiles)
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
