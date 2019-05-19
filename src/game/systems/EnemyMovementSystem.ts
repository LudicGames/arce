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
      const castleTile: Tile = tiles.find(tile => castleState.tile == tile)
      const castleTilePosition = this.pm.get(castleTile)
      const castleVec: Vector2 = new Vector2(castleTilePosition.x, castleTilePosition.y)

      enemies.forEach(enemy => {
        let enemyPosition = this.pm.get(enemy)
        const enemyState = this.esm.get(enemy)
        const enemyVec = new Vector2(enemyPosition.x, enemyPosition.y)

        let diffVec = new Vector2(castleVec.x - enemyVec.x, castleVec.y - castleVec.x)
        diffVec = Vector2Normalize(diffVec)
        diffVec = new Vector2(diffVec.x * enemyState.speed, diffVec.y * enemyState.speed)

        enemyPosition.x += diffVec.x
        enemyPosition.y += diffVec.y

      })
    }
  }
}
