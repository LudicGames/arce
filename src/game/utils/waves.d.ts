export interface EnemyWave {
  start: number
  enemyGroups: EnemyGroup[]
}

export interface EnemyGroup {
  start: number
  total: number
  type: string
  spawnTileIndex: number
  spawnInterval: number
}
