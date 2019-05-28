import { Map } from '../../utils/Map'
import Hex, { OffsetCoordinate, CubeCoordinate } from '../../utils/Hex'

const mapConfig: Map = {
  tiles: [
    { q:14, r: -7, tileType: '2' },
    { q:14, r: -6, tileType: '2' },
    { q:14, r: -5, tileType: '2' },
    { q:14, r: -4, tileType: '2' },
    { q:14, r: -3, tileType: '2' },
    { q:13, r: -3, tileType: '2' },
    { q:12, r: -2, tileType: '2' },
    { q:11, r: -3, tileType: '2' },
    { q:10, r: -2, tileType: '2' },
    { q:9,  r: -3, tileType: '2' },
    { q:8,  r: -2, tileType: '2' },
    { q:7,  r: -2, tileType: '2' },
    { q:6,  r: -2, tileType: '2' },
    { q:5,  r: -2, tileType: '2' },
    { q:4,  r: -2, tileType: '2' },
    { q:3,  r: -2, tileType: '2' },
    { q:2,  r: -1, tileType: '2' },
    { q:9,  r: -8, tileType: '2' },
    { q:9,  r: -7, tileType: '2' },
    { q:9,  r: -6, tileType: '2' },
    { q:9,  r: -5, tileType: '2' },
    { q:9,  r: -4, tileType: '2' },
  ],
  castles: [{q:2,  r: -1}],
  playerSpawnPoints: [
    {q:1, r: -2},
    {q:3, r: -1},
  ]
}

export default mapConfig
