import { EnemyWave, EnemyGroup } from '../../utils/waves.ts'

const waves: EnemyWave[] = [
  {
    start: 1000,
    enemyGroups: [
      {
        type: '1',
        count: 5,
        spawnInterval: 1000,
        spawnTileIndex: 33
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
        spawnTileIndex: 85
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
        spawnTileIndex: 133
      }
    ]
  },
]

export default waves
