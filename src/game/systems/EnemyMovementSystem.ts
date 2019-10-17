import Ludic, { Vector2 } from '@ludic/ludic'
import { System, World, Entity } from 'ecsy'
import { QueryType } from '/src/ecsy'
import { PositionComponent,
         MovementComponent,
         isTileComponent,
         isEnemyComponent,
         SizeComponent,
         EnemyConfigComponent,
         isCastleComponent,
         CubeCoordinateComponent,
       } from '../components'

import { Vector2Normalize } from '../utils/Euclid'
import { Hex, CubeCoordinate, OffsetCoordinate, allNeighbors } from '../utils/Hex'

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
    const currentHex = new Hex(current.x, current.y, current.z, 0)
    const neighborCubeCoords: CubeCoordinate[] = allNeighbors(currentHex).map((hex: Hex)=>{ return {x: hex.x, y: hex.y, z: hex.z}})

    // TODO
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


  generatePathMap(tiles: Entity[], castleCoords: CubeCoordinate): any {
    let frontier: CubeCoordinate[] = []
    frontier.push(castleCoords)

    this.pathMap = new Map()
    this.pathMap.set(castleCoords, null)

    while(frontier.length){
      const current: CubeCoordinate = frontier.shift()
      const neighborTiles: Entity[] = this.getNeighborTiles(tiles, current)

      // TODO, broken, self is not neighbor
      // console.log("neighborTiles: ", neighborTiles)

      neighborTiles.forEach((tile: Entity) => {
        const tileCoord: CubeCoordinate = tile.getComponent(CubeCoordinateComponent)
        if(!this.pathMap.get(tileCoord)){
          frontier.push(tileCoord)
          this.pathMap.set(tileCoord, current)
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
    const castleCoords = castle.getComponent(CubeCoordinateComponent)

    if(!this.pathMap) this.generatePathMap(tiles, castleCoords)


    // enemies.forEach((enemy: Entity) => {
    //   let enemyPosition = enemy.getMutableComponent(PositionComponent)
    //   let enemyCoords = cubeCoordinateFromPosition(enemyPosition, size)

    //   const currentTile: Entity = tiles.find((tile: Entity) => {
    //     let tileCoords = tile.getComponent(CubeCoordinateComponent)
    //     if(tileCoords.x == enemyCoords.x && tileCoords.y == enemyCoords.y && tileCoords.z == enemyCoords.z){
    //       return true
    //     } else {
    //       return false
    //     }
    //   })

    //   // If we are not in the center of our current hex, go there
    //   if(Math.abs(currentHex.position.x - pos.x) > .05 || Math.abs(currentHex.position.y - pos.y) > .05){
    //     const diffVec: Vector2 = this.moveToHexCenter(pos, currentHex, state.speed)
    //     enemyPosition.x += diffVec.x
    //     enemyPosition.y += diffVec.y
    //   } else {

    //     // Go to the next Hex
    //     let next = this.pathMap.get(currentTile)
    //     state.currentHex = this.tsm.get(next).hex
    //   }
    // })
  }
}

// @ts-ignore
EnemyMovementSystem.queries = {
  enemies: { components: [isEnemyComponent], mandatory: true},
  tiles:  { components: [isTileComponent], mandatory: true},
  castles:  { components: [isCastleComponent], mandatory: true},
}
