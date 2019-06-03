import { Component } from '@ludic/ein'
import Player from '../entities/Player'
import Hex from '../utils/Hex'
import Color from '../utils/Color'

const TILE_COLORS = {
  '1': {r:46,  g:204, b:113, a:0},
  '2': {r:52,  g:152, b:219, a:0},
  '3': {r:155, g: 89, b:182, a:0},
  '4': {r:241, g:196, b:15,  a:0},
  '5': {r:231, g:76,  b:60,  a:0}
}

export type TileType =  "1" | "2" | "3" | "4" | "5"

export default class TileStateComponent extends Component {
  hex: Hex
  active: boolean
  tileType: string
  playersOn: Player[]
  building: boolean = false

  private _color: string
  private _fill: string

  constructor(hex: Hex, tileType: TileType = '1', active: boolean = false){
    super()
    this.hex = hex
    this.active = active
    this.tileType = tileType
    this.playersOn = []
  }

  get color(): Color {
    let tc = TILE_COLORS[this.tileType]
    return new Color(tc.r, tc.g, tc.b, tc.a)
  }

  get fill(): string {
    let tc = TILE_COLORS[this.tileType]
    let baseColor: Color = new Color(tc.r, tc.g, tc.b, tc.a)
    if(this.active){
      baseColor.a = .4
    } else {
      baseColor.a = .1
    }

    return baseColor.toString()
  }
}
