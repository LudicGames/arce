import Ludic, { Camera, Vector2 } from '@ludic/ludic'
import {ComponentMapper, Family, Entity, IntervalSystem, Engine} from '@ludic/ein'

import PositionComponent from '../components/PositionComponent'
import TileStateComponent from '../components/TileStateComponent'
import PlayerStateComponent from '../components/PlayerStateComponent'
import CastleStateComponent from '../components/CastleStateComponent'
import EnemyStateComponent from '../components/EnemyStateComponent'

import Player from '../entities/Player'
import Enemy from '../entities/Enemy'
import Tile from '../entities/Tile'
import Castle from '../entities/Castle'

import { EnemyWave, EnemyGroup } from '../utils/waves.ts'


export default class EnemySpawnSystem extends IntervalSystem {
  private pm: ComponentMapper<PositionComponent> = ComponentMapper.getFor(PositionComponent)
  private psm: ComponentMapper<PlayerStateComponent> = ComponentMapper.getFor(PlayerStateComponent)
  private tsm: ComponentMapper<TileStateComponent> = ComponentMapper.getFor(TileStateComponent)
  private csm: ComponentMapper<CastleStateComponent> = ComponentMapper.getFor(CastleStateComponent)
  private esm: ComponentMapper<EnemyStateComponent> = ComponentMapper.getFor(EnemyStateComponent)

  public entities: Entity[]
  public family: Family
  public engine: Engine

  public waves: EnemyWave[]
  public currentWave: EnemyWave
  public interval: number
  public intervalCount: number

  constructor(waves: EnemyWave[], interval: number = 1000){
    // TODO not sure about just running every 1sec here
    super(interval)
    this.waves = waves
    this.interval =  interval
    this.intervalCount = 0
    this.family = Family.all([]).get()
  }

  public addedToEngine(engine: Engine): void {
    this.entities = engine.getEntitiesFor(this.family)
  }

  public removedFromEngine(engine: Engine): void {
    this.entities = []
  }

  public updateCurrentWave(){
    const dt = this.interval * this.intervalCount
    for(let i=0; i<this.waves.length; i++){
      let wave = this.waves[i]

      // For the first wave
      if(!this.currentWave && wave.start <= dt){
        this.currentWave = wave
        return
      }

      if(wave.start <= dt){
        this.currentWave = wave
      }
    }
  }

  public updateInterval(): void {
    this.intervalCount++
    const dt = this.interval * this.intervalCount
    this.updateCurrentWave()
    if(!this.currentWave) return

    this.entities = this.engine.getEntitiesFor(this.family)
    const players: Player[] = this.entities.filter(entity => !!this.psm.get(entity))
    const tiles: Tile[]     = this.entities.filter(entity => !!this.tsm.get(entity))
    const castles: Castle[] = this.entities.filter(entity => !!this.csm.get(entity))
    const enemies: Enemy[]  = this.entities.filter(entity => !!this.esm.get(entity))

    const currentWaveEnemies = enemies.filter(enemy => this.esm.get(enemy).wave == this.currentWave)

    this.currentWave.enemyGroups.forEach((currentGroup: EnemyGroup) => {
      const currentGroupEnemies = currentWaveEnemies.filter(enemy => this.esm.get(enemy).group = currentGroup)

      // Do we need to spawn more enemies for this group?
      if(currentGroupEnemies.length < currentGroup.count){
        const nextSpawnTime = this.currentWave.start + (currentGroupEnemies.length * currentGroup.spawnInterval)
        if(nextSpawnTime == dt){
          const spawnTile = tiles[currentGroup.spawnTileIndex]
          const enemy = new Enemy(spawnTile, this.currentWave, currentGroup, currentGroup.type)
          this.engine.addEntity(enemy)
        }
      }
    })
  }
}
