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
      const castleVec: Vector2 = castleState.hex.position

      enemies.forEach(enemy => {
        let enemyPosition = this.pm.get(enemy)
        const state = this.esm.get(enemy)
        const pos = new Vector2(enemyPosition.x, enemyPosition.y)
        const currentHex = state.currentHex
        const previousHex = state.previousHex

        // console.log("px: ", pos.x)
        // console.log("py: ", pos.y)
        // console.log("hx: ", hex.position.x)
        // console.log("hy: ", hex.position.y)

        // If we are not in the center of our current hex, go there
        if(Math.abs(currentHex.position.x - pos.x) > .05 || Math.abs(currentHex.position.y - pos.y) > .05){
          const diffVec: Vector2 = this.moveToHexCenter(pos, currentHex, state.speed)
          enemyPosition.x += diffVec.x
          enemyPosition.y += diffVec.y
        } else {

          // Get neighbor hexes
          const neighborHexes: Hex[] = Hex.allNeighbors(currentHex)

          // Get corresponding tiles that can be moved to
          const neighborTiles: Tile[] = tiles.filter(tile => {
            let tileState = this.tsm.get(tile)
            let tileHex = tileState.hex

            // Enemies can't move to tileType = '1'
            if(tileState.tileType == '1'){
              return false
            }

            // Don't move backwards (for now)
            if(previousHex && Hex.equal(tileHex, previousHex)){
              return false
            }

            let found = false
            neighborHexes.forEach(h => {
              if(Hex.equal(h, tileHex)){
                found = true
              }
            })
            return found
          })


          // console.log("neighborTiles: ", neighborTiles)
          // Set the current hex to be a neighbor tile
          // TODO use A* algo to select one of the neighborTiles
          if(neighborTiles.length){
            state.previousHex = currentHex
            state.currentHex = this.tsm.get(neighborTiles[0]).hex
          }
        }
      })
    }
  }
}
