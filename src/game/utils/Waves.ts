import { OffsetCoordinate, CubeCoordinate } from './Hex'

export interface EnemyWave {
  start: number
  enemyGroups: EnemyGroup[]
}

export interface EnemyGroup {
  start: number
  count: number
  type: string
  spawnCoordinate: CubeCoordinate
  spawnInterval: number
}
