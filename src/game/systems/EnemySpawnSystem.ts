import Ludic, { Camera, Vector2 } from '@ludic/ludic'
import { System, World, Entity } from 'ecsy'
import { QueryType } from '/src/ecsy'

import { PositionComponent, TileStateComponent, PlayerStateComponent, CastleStateComponent, EnemyStateComponent } from '../components'
import Player from '../entities/Player'
import Enemy from '../entities/Enemy'
import Tile from '../entities/Tile'
import Castle from '../entities/Castle'

import { EnemyWave, EnemyGroup } from '../utils/waves'
import Hex from '../utils/Hex'

export default class EnemySpawnSystem extends System {
  engine: World
  waves: EnemyWave[]
  currentWave: EnemyWave
  interval: number
  intervalCount: number

  constructor(waves: EnemyWave[], interval: number = 1000){
    super(interval)
    this.waves = waves
    this.interval =  interval
    this.intervalCount = 0
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

    const hexSideLength = this.tsm.get(tiles[0]).hex.sideLength

    this.currentWave.enemyGroups.forEach((currentGroup: EnemyGroup) => {
      const currentGroupEnemies = currentWaveEnemies.filter(enemy => this.esm.get(enemy).group = currentGroup)

      // Do we need to spawn more enemies for this group?
      if(currentGroupEnemies.length < currentGroup.count){
        const nextSpawnTime = this.currentWave.start + (currentGroupEnemies.length * currentGroup.spawnInterval)
        if(nextSpawnTime == dt){
          let spawnPos = currentGroup.spawnCoordinate
          let hex = new Hex(spawnPos.x, spawnPos.y, spawnPos.z, hexSideLength)
          const enemy = new Enemy(hex, this.currentWave, currentGroup, currentGroup.type)
          this.engine.addEntity(enemy)
        }
      }
    })
  }
}
