import { EnemyWave, EnemyGroup } from '../../utils/waves.ts'

const waves: EnemyWave[] = [
  {
    start: 1000,
    enemyGroups: [
      {
        type: '1',
        count: 5,
        spawnInterval: 1000,
        spawnTileIndex: 4
      }
    ]
  },
  {
    start: 10000,
    enemyGroups: [
      {
        type: '2',
        count: 2,
        spawnInterval: 1000,
        spawnTileIndex: 5
      }
    ]
  },
  {
    start: 20000,
    enemyGroups: [
      {
        type: '1',
        count: 2,
        spawnInterval: 1000,
        spawnTileIndex: 3
      }
    ]
  },
]

export default waves
