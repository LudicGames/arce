import { Map } from '../../utils/Map'
import Hex, { OffsetCoordinate, CubeCoordinate } from '../../utils/Hex'

const mapConfig: Map = {
  tiles: [
    { offsetCoordinate: {q:14, r: -7}, tileType: '4' },
    { offsetCoordinate: {q:14, r: -6}, tileType: '4' },
    { offsetCoordinate: {q:14, r: -5}, tileType: '4' },
    { offsetCoordinate: {q:14, r: -4}, tileType: '4' },
    { offsetCoordinate: {q:14, r: -3}, tileType: '4' },
    { offsetCoordinate: {q:13, r: -3}, tileType: '4' },
    { offsetCoordinate: {q:12, r: -2}, tileType: '4' },
    { offsetCoordinate: {q:11, r: -3}, tileType: '4' },
    { offsetCoordinate: {q:10, r: -2}, tileType: '4' },
    { offsetCoordinate: {q:9,  r: -3}, tileType: '4' },
    { offsetCoordinate: {q:8,  r: -2}, tileType: '4' },
    { offsetCoordinate: {q:7,  r: -2}, tileType: '4' },
    { offsetCoordinate: {q:6,  r: -2}, tileType: '4' },
    { offsetCoordinate: {q:5,  r: -2}, tileType: '4' },
    { offsetCoordinate: {q:4,  r: -2}, tileType: '4' },
    { offsetCoordinate: {q:3,  r: -2}, tileType: '4' },
  ],
  castles: [{offsetCoordinate: {q:2,  r: -1}}],
  playerSpawnPoints: [
    {q:1, r: -2},
    {q:3, r: -1},
  ]
}

export default mapConfig
