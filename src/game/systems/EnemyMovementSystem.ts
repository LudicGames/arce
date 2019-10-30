import Ludic, { Vector2 } from '@ludic/ludic'
import { System, World, Entity } from 'ecsy'
import { QueryType } from '/src/ecsy'
import { PositionComponent,
         isTileComponent,
         isEnemyComponent,
         SizeComponent,
         EnemyConfigComponent,
         isCastleComponent,
         SpeedComponent,
         DestinationCubeComponent,
         CubeCoordinateComponent,
         PreviousCubeComponent,
       } from '../components'

import { Vector2Normalize } from '../utils/Euclid'
import { Hex, CubeCoordinate, OffsetCoordinate, cube_all_neighbors, vector2_to_cube, cube_to_vector2 } from '../utils/Hex'

export default class EnemyMovementSystem extends System {
  enabled: boolean
  world: World

  queries: {
    enemies: QueryType
    tiles:  QueryType
    castles: QueryType
  }

  pathMap: any = null

  getNeighborTiles(tiles: Entity[], current: CubeCoordinate): Entity[] {
    const neighborCubeCoords: CubeCoordinate[] = cube_all_neighbors(current)

    // console.log("neighborCubeCoords: ", neighborCubeCoords)
    return tiles.filter((tile: Entity) => {
      let found = false
      neighborCubeCoords.forEach((coord: CubeCoordinate) => {
        const tileCoord: CubeCoordinate = tile.getComponent(CubeCoordinateComponent)
        if(coord.x == tileCoord.x && coord.y == tileCoord.y && coord.z == tileCoord.z){
          found = true
        }
      })
      return found
    })
  }

  cubeToString(cube: CubeCoordinate): string {
    return '' + cube.x + cube.y + cube.z
  }


  generatePathMap(tiles: Entity[], castleCoords: CubeCoordinate): any {
    let frontier: CubeCoordinate[] = [castleCoords]
    this.pathMap = new Map()
    this.pathMap.set(this.cubeToString(castleCoords), null)

    while(frontier.length){
      const current: CubeCoordinate = frontier.shift()
      const neighborTiles: Entity[] = this.getNeighborTiles(tiles, current)

      neighborTiles.forEach((tile: Entity) => {
        const tileCoordComponent: CubeCoordinateComponent = tile.getComponent(CubeCoordinateComponent)
        const tileCoord: CubeCoordinate = {x: tileCoordComponent.x, y: tileCoordComponent.y, z: tileCoordComponent.z}
        if(!this.pathMap.has(this.cubeToString(tileCoord))){
          frontier.push(tileCoord)
          this.pathMap.set(this.cubeToString(tileCoord), current)
        }
      })
    }
    return this.pathMap
  }

  moveToHexCenter(currentPosition: Vector2, hex: Hex, speed: number): Vector2 {
    let diffVec = new Vector2(hex.position.x - currentPosition.x, hex.position.y - currentPosition.y)
    diffVec = Vector2Normalize(diffVec)
    return new Vector2(diffVec.x * speed, diffVec.y * speed)
  }

  execute(deltaTime: number): void {
    const enemies: Entity[] = this.queries.enemies.results
    const castles: Entity[] = this.queries.castles.results
    const tiles: Entity[] = this.queries.tiles.results

    const castle: Entity = castles[0]
    const castleCoordsComponent = castle.getComponent(CubeCoordinateComponent)
    const castleCube = {x: castleCoordsComponent.x, y: castleCoordsComponent.y, z: castleCoordsComponent.z}

    if(!this.pathMap) this.generatePathMap(tiles, castleCube)

    const tileSize: number = tiles[0].getComponent(SizeComponent).value

    enemies.forEach((enemy: Entity) => {
      const enemySpeed: number = enemy.getComponent(SpeedComponent).value
      let enemyPositionComponent = enemy.getMutableComponent(PositionComponent)
      let enemyPosition: Vector2 = new Vector2(enemyPositionComponent.x, enemyPositionComponent.y)
      let currentCube: CubeCoordinate = enemy.getMutableComponent(CubeCoordinateComponent)
      let destinationCube: CubeCoordinate = enemy.getMutableComponent(DestinationCubeComponent)
      let previousCube: CubeCoordinate = enemy.getMutableComponent(PreviousCubeComponent)

      // If the Enemy is not in the center of our current Tile, go there
      let tileCenter: Vector2 = cube_to_vector2(destinationCube, tileSize)
      if(Math.abs(tileCenter.x - enemyPosition.x) > .05 || Math.abs(tileCenter.y - enemyPosition.y) > .05){
        let diffVec = new Vector2(tileCenter.x - enemyPosition.x, tileCenter.y - enemyPosition.y)
        diffVec = Vector2Normalize(diffVec)
        enemyPositionComponent.x += diffVec.x * enemySpeed
        enemyPositionComponent.y += diffVec.y * enemySpeed

        let nowCube: CubeCoordinate = vector2_to_cube(new Vector2(enemyPositionComponent.x, enemyPositionComponent.y),  tileSize)
        if(nowCube.x != currentCube.x || nowCube.y != currentCube.y || nowCube.z != currentCube.z){
          currentCube.x = nowCube.x
          currentCube.y = nowCube.y
          currentCube.z = nowCube.z
        }
      } else {
        previousCube.x = destinationCube.x
        previousCube.y = destinationCube.y
        previousCube.z = destinationCube.z

        let nextCube = this.pathMap.get(this.cubeToString(previousCube))
        if(nextCube){
          destinationCube.x = nextCube.x
          destinationCube.y = nextCube.y
          destinationCube.z = nextCube.z
        }
      }
    })
  }
}

// @ts-ignore
EnemyMovementSystem.queries = {
  enemies: { components: [isEnemyComponent], mandatory: true},
  tiles:  { components: [isTileComponent], mandatory: true},
  castles:  { components: [isCastleComponent], mandatory: true},
}
