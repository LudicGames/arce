import Ludic, { Camera, Vector2 } from '@ludic/ludic'
import {ComponentMapper, Family, Entity, IntervalSystem, Engine} from '@ludic/ein'

import PositionComponent from '../components/PositionComponent'
import TileStateComponent from '../components/TileStateComponent'
import PlayerStateComponent from '../components/PlayerStateComponent'
import CastleStateComponent from '../components/CastleStateComponent'
import EnemyStateComponent from '../components/EnemyStateComponent'

import Enemy from '../entities/Enemy'

export interface EnemyWave {
  enemyGroups: EnemyGroup[]

}

export interface EnemyGroup {
  enemyType: string
  spawnTileIndex: number
}


export default class EnemySpawnSystem extends IntervalSystem {
  private pm: ComponentMapper<PositionComponent> = ComponentMapper.getFor(PositionComponent)
  private psm: ComponentMapper<PlayerStateComponent> = ComponentMapper.getFor(PlayerStateComponent)
  private tsm: ComponentMapper<TileStateComponent> = ComponentMapper.getFor(TileStateComponent)
  private csm: ComponentMapper<CastleStateComponent> = ComponentMapper.getFor(CastleStateComponent)
  private esm: ComponentMapper<EnemyStateComponent> = ComponentMapper.getFor(EnemyStateComponent)

  public entities: Entity[]
  public family: Family
  public engine: Engine

  public spawnTileIndex: number
  public spawnInterval: number

  constructor(spawnTileIndex: number = 33, spawnInterval: number = 1000){
    super(spawnInterval)
    this.spawnInterval = spawnInterval
    this.spawnTileIndex = spawnTileIndex
    this.family = Family.all([]).get()
  }

  public addedToEngine(engine: Engine): void {
    this.entities = engine.getEntitiesFor(this.family)
  }

  public removedFromEngine(engine: Engine): void {
    this.entities = []
  }

  public updateInterval(): void {
    const ctx = Ludic.canvas.context

    if(this.engine) {
      this.entities = this.engine.getEntitiesFor(this.family)
    }

    const players = this.entities.filter(entity => !!this.psm.get(entity))
    const tiles   = this.entities.filter(entity => !!this.tsm.get(entity))
    const castles = this.entities.filter(entity => !!this.csm.get(entity))
    const enemies = this.entities.filter(entity => !!this.esm.get(entity))

    console.log("spawn enemy")

    const spawnTile = tiles[this.spawnTileIndex]

    const enemy = new Enemy(spawnTile)
    this.engine.addEntity(enemy)
    // this.enemies.push(enemy)

  }
}
