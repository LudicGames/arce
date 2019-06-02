import { EnemyWave, EnemyGroup } from '../../utils/Waves'

const WavesConfig: EnemyWave[] = [
  {
    start: 1000,
    enemyGroups: [
      {
        start: 0,
        type: '1',
        count: 1,
        spawnInterval: 1000,
        spawnCoordinate: {x:14, y: 0, z: -14}
      }
    ]
  },
  {
    start: 10000,
    enemyGroups: [
      {
        start: 0,
        type: '2',
        count: 2,
        spawnInterval: 1000,
        spawnCoordinate: {x:8, y: 3, z: -11}
      }
    ]
  },
  {
    start: 20000,
    enemyGroups: [
      {
        start: 0,
        type: '1',
        count: 2,
        spawnInterval: 1000,
        spawnCoordinate: {x:7, y: 1, z: -8}
      }
    ]
  },
]

export default WavesConfig
