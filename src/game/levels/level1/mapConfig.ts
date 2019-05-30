import { Map } from '../../utils/Map'
import Hex, { OffsetCoordinate, CubeCoordinate } from '../../utils/Hex'

const mapConfig: Map = {
  tiles: [
    {
      pos: {x:14, y: 0, z: -14},
      tileType: '2'
    },
    {
      pos: {x:14, y: -1, z: -13},
      tileType: '2'
    },
    {
      pos: {x:14, y: -2, z: -12},
      tileType: '2'
    },
    {
      pos: {x:14, y: -3, z: -11},
      tileType: '2'
    },
    {
      pos: {x:14, y: -4, z: -10},
      tileType: '2'
    },
    {
      pos: {x:14, y: -5, z: -9},
      tileType: '2'
    },
    {
      pos: {x:14, y: -6, z: -8},
      tileType: '2'
    },
    {
      pos: {x:13, y: -5, z: -8},
      tileType: '2'
    },
    {
      pos: {x:12, y: -5, z: -7},
      tileType: '2'
    },
    {
      pos: {x:11, y: -4, z: -7},
      tileType: '2'
    },
    {
      pos: {x:10, y: -4, z: -6},
      tileType: '2'
    },
    {
      pos: {x:9, y: -3, z: -6},
      tileType: '2'
    },
    {
      pos: {x:8, y: -3, z: -5},
      tileType: '2'
    },
    {
      pos: {x:7, y: -2, z: -5},
      tileType: '2'
    },
    {
      pos: {x:6, y: -2, z: -4},
      tileType: '2'
    },
    {
      pos: {x:5, y: -1, z: -4},
      tileType: '2'
    },
    {
      pos: {x:4, y: -1, z: -3},
      tileType: '2'
    },
    {
      pos: {x:3, y: 0, z: -3},
      tileType: '2'
    },
    {
      pos: {x:2,  y: 0, z: -2},
      tileType: '2'
    },
  ],
  castles: [{x:2,  y: 0, z: -2}],
  playerSpawnPoints: [
    {x:1, y: 1, z: -2},
    {x:3, y: -1, z: 2},
  ]
}

export default mapConfig
