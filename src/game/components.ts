import Ludic from '@ludic/ludic'
import { Camera, Vector2 } from '@ludic/ludic'

import TowerMenu from './ui/towerMenu'

import { EnemyWave, EnemyGroup } from './utils/Waves'
import Hex from './utils/Hex'
import Color from './utils/Color'

import Tile from './entities/Tile'
import Player from './entities/Player'

const TILE_COLORS = {
  '1': {r:46,  g:204, b:113, a:0},
  '2': {r:52,  g:152, b:219, a:0},
  '3': {r:155, g: 89, b:182, a:0},
  '4': {r:241, g:196, b:15,  a:0},
  '5': {r:231, g:76,  b:60,  a:0}
}

export type TileType =  "1" | "2" | "3" | "4" | "5"

export class TileState {
  hex: Hex
  active: boolean
  tileType: string
  playersOn: Player[]
  building: boolean = false

  private _color: string
  private _fill: string

  constructor(hex: Hex, tileType: TileType = '1', active: boolean = false){
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

export class TowerStateComponent {
  hex: Hex
  type: string
  color: string
  size: number

  constructor(hex: Hex, type: string = "1"){
    this.hex = hex
    this.type = type

    if(type === "1"){
      this.color = 'blue'
      this.size = 1
    } else {
      this.color = 'red'
      this.size = .5
    }
  }
}


export class EnemyState {
  currentHex: Hex
  previousHex: Hex
  health: number
  speed: number
  color: string
  size: number
  type: string
  wave: EnemyWave
  group: EnemyGroup

  constructor(hex: Hex, wave: EnemyWave, group: EnemyGroup, type: string = "1", speed: number = .1, health: number = 10, size: number = 1){
    this.currentHex = hex
    this.previousHex = null
    this.wave = wave
    this.group = group
    this.type = type
    this.speed = speed
    this.health = health
    this.color = 'red'
    this.size = size
  }
}

export class CastleState {
  hex: Hex
  health: number
  size: number

  constructor(hex: Hex, health: number = 10, size: number = 2){
    this.hex = hex
    this.health = health
    this.size = size
  }
}

export class PlayerState {
  size: number
  vibrating: boolean
  playerType: string
  color: string
  currentTile: Tile
  boosting: boolean
  boostMultiplier = 1.2
  building: boolean = false

  private _speed = 0.5

  constructor(size: number = 1, playerType: string = 'type1'){
    this.size = size
    this.vibrating = false
    this.playerType = playerType

    if(this.playerType == 'type1'){
      this.color = 'rgba(192, 57, 43,1.0)'
    } else {
      this.color = 'orange'
    }
  }

  get speed(): number {
    return this.boosting ? this._speed * this.boostMultiplier : this._speed
  }
}

export class CameraComponent {
  camera: Camera
  constructor(camera: Camera) {
    this.camera = camera
  }
}

export class Fill {
  fillStyle: string | CanvasGradient | CanvasPattern
  constructor(fillStyle: Fill['fillStyle']){
    this.fillStyle = fillStyle
  }
}

export class Gamepad {
  index: number
  constructor(index: number){
     this.index = index
  }
}

export class Mech {
  type: string
  constructor(type: string) {
    this.type = type
  }
}

export class Movement {
	public velocity: Vector2 = new Vector2()
	public accel: Vector2 = new Vector2()

  constructor(velocity: Vector2, accel: Vector2) {
    this.velocity = velocity
    this.accel = accel
  }
}

export class Position {
	public x: number
	public y: number

  constructor(x: number, y: number){
    this.x = x
    this.y = y
  }
}

export type RenderFn = (ctx: CanvasRenderingContext2D, ...args: any[]) => void

export class Render  {
	public renderFn: RenderFn
  constructor(renderFn: RenderFn){
    this.renderFn = renderFn
  }
}

const MAP = new WeakMap<TowerMenuComponent, TowerMenu>()

export class TowerMenuComponent {

  constructor(component?: TowerMenu){
    MAP.set(this, component || new TowerMenu())
    Ludic.ui.add(this.component)
  }

  get component(){
    return MAP.get(this)
  }
}
