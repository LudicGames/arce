import Ludic, { Vector2 } from '@ludic/ludic'
import {ComponentMapper, Family, Entity, System, Engine} from '@ludic/ein'

import PositionComponent from '../components/PositionComponent'
import TileStateComponent from '../components/TileStateComponent'
import PlayerStateComponent from '../components/PlayerStateComponent'
import CastleStateComponent from '../components/CastleStateComponent'
import EnemyStateComponent from '../components/EnemyStateComponent'

import Player from '../entities/Player'
import Enemy from '../entities/Enemy'
import Tile from '../entities/Tile'
import Castle from '../entities/Castle'

import { Vector2Normalize } from '../utils/Euclid'
import Hex, { CubeCoordinate, OffsetCoordinate } from '../utils/Hex'

export default class EnemyMovementSystem extends System {
  private pm: ComponentMapper<PositionComponent> = ComponentMapper.getFor(PositionComponent)
  private psm: ComponentMapper<PlayerStateComponent> = ComponentMapper.getFor(PlayerStateComponent)
  private tsm: ComponentMapper<TileStateComponent> = ComponentMapper.getFor(TileStateComponent)
  private csm: ComponentMapper<CastleStateComponent> = ComponentMapper.getFor(CastleStateComponent)
  private esm: ComponentMapper<EnemyStateComponent> = ComponentMapper.getFor(EnemyStateComponent)

  public entities: Entity[]
  public family: Family
  public engine: Engine
  public distanceMap: any

  constructor(){
    super()
    this.family = Family.all([]).get()
  }

  public addedToEngine(engine: Engine): void {
    this.entities = engine.getEntitiesFor(this.family)
    this.engine = engine
  }

  public removedFromEngine(engine: Engine): void {
    this.entities = []
  }

  getNeighborTiles(tiles: Tile[], tile: Tile){
    let state = this.tsm.get(tile)
    let hex = state.hex
    let neighborHexes: Hex[] = Hex.allNeighbors(hex)
    return tiles.filter((t: Tile) => {
      let ts = this.tsm.get(t)
      let found = false

      if(ts.tileType != '1'){
        return false
      }

      neighborHexes.forEach((nh: Hex) => {
        if(Hex.equal(nh, ts.hex)){
          found = true
        }
      })
      return found
    })
  }

  generatePathMap(tiles: Tile[], castleTile: Tile){
    let frontier: Tile[] = []
    frontier.push(castleTile)
    let cameFrom = new Map()
    cameFrom.set(castleTile, null)

    while(frontier.length){
      let current: Tile = frontier.shift()
      let neighborTiles: Tile[] = this.getNeighborTiles(tiles, current)

      neighborTiles.forEach((t: Tile) => {
        if(!cameFrom.get(t)){
          frontier.push(t)
          cameFrom.set(t, current)
        }
      })
    }
    // console.log("cameFrom: ", cameFrom)

    return cameFrom
  }

  public moveToHexCenter(currentPosition: Vector2, hex: Hex, speed: number): Vector2 {
    let diffVec = new Vector2(hex.position.x - currentPosition.x, hex.position.y - currentPosition.y)
    diffVec = Vector2Normalize(diffVec)
    return new Vector2(diffVec.x * speed, diffVec.y * speed)
  }

  public update(deltaTime: number): void {
    this.entities = this.engine.getEntitiesFor(this.family)
    const players: Player[] = this.entities.filter(entity => !!this.psm.get(entity))
    const tiles: Tile[]     = this.entities.filter(entity => !!this.tsm.get(entity))
    const castles: Castle[] = this.entities.filter(entity => !!this.csm.get(entity))
    const enemies: Enemy[]  = this.entities.filter(entity => !!this.esm.get(entity))


    if(castles.length){
      const cv = new Vector2(0, -.1)
      const castle = castles[0]
      const castleState = this.csm.get(castle)
      const castleHex: Hex = castleState.hex
      const castleVec: Vector2 = castleHex.position

      let castleTile: Tile = tiles.find((t: Tile) => {
        let state = this.tsm.get(t)
        let hex = state.hex
        return Hex.equal(castleHex, hex)
      })

      let pathMap = this.generatePathMap(tiles, castleTile)


      enemies.forEach(enemy => {
        let enemyPosition = this.pm.get(enemy)
        const state = this.esm.get(enemy)
        const pos = new Vector2(enemyPosition.x, enemyPosition.y)
        const currentHex = state.currentHex
        const previousHex = state.previousHex

        const currentTile = tiles.find((t: Tile) => {
          let tileState = this.tsm.get(t)
          if(Hex.equal(tileState.hex, currentHex)){
            return true
          } else {
            return false
          }
        })

        // If we are not in the center of our current hex, go there
        if(Math.abs(currentHex.position.x - pos.x) > .05 || Math.abs(currentHex.position.y - pos.y) > .05){
          const diffVec: Vector2 = this.moveToHexCenter(pos, currentHex, state.speed)
          enemyPosition.x += diffVec.x
          enemyPosition.y += diffVec.y
        } else {

          // Go to the next Hex
          let next = pathMap.get(currentTile)
          state.currentHex = this.tsm.get(next).hex
        }
      })
    }
  }
}
