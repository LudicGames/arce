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
        spawnCoordinate: {q: 14, r: -7}
      }
    ]
  },
  // {
  //   start: 10000,
  //   enemyGroups: [
  //     {
  //       start: 0,
  //       type: '2',
  //       count: 2,
  //       spawnInterval: 1000,
  //       spawnCoordinate: {q: 14, r: -7}
  //     }
  //   ]
  // },
  // {
  //   start: 20000,
  //   enemyGroups: [
  //     {
  //       start: 0,
  //       type: '1',
  //       count: 2,
  //       spawnInterval: 1000,
  //       spawnCoordinate: {q: 9, r: -8}
  //     }
  //   ]
  // },
]

export default WavesConfig
