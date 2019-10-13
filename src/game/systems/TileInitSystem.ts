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

    const rings: number = 6
    let totalTiles: number = 1
    for(let i=1; i<=rings; i++){totalTiles+= 6 * i}
    console.log("totalTiles: ", totalTiles)

    // Not perfect, need to do basic trig
    const size: number = mapH / ((2*rings) * 2)

    const start = rings * -1
    for(let x=start; x<=rings; x++){
      for(let y=start; y<=rings; y++){
        for(let z=start; z<=rings; z++){
          if(x+y+z === 0){
            this.world.createEntity()
              .addComponent(isTileComponent)
              .addComponent(SizeComponent, {value: size})
              .addComponent(CubeCoordinateComponent, {x, y, z})
          }
        }
      }
    }

    // map.tiles.forEach((tile: MapTile) => {
    //   this.world.createEntity()
    //     .addComponent(isTileComponent)
    //     .addComponent(SizeComponent, {value: size})
    //     .addComponent(CubeCoordinateComponent, tile.coords)
    // })

    // this System only runs once
    this.enabled = false
  }
}

// @ts-ignore
TileInitSystem.queries = {
  map: { components: [MapConfigComponent], mandatory: true},
  camera: { components: [CameraComponent], mandatory: true},
}
