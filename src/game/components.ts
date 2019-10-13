import Ludic, { Camera, Vector2 } from '@ludic/ludic'
import { Component, TagComponent } from 'ecsy'

import TowerMenu from './ui/towerMenu'

import { EnemyWave, EnemyGroup } from './utils/Waves'

import Color from './utils/Color'

import Player from './entities/Player'
import Tile from './entities/Tile'

export class CameraComponent  extends Component {
  value: Camera
  constructor(){
    super()
    this.value = null
  }
}


// TODO break this up into multiple components and a component flag isCastle
export class CastleStateComponent extends Component {
  health: number
  size: number

  constructor(health: number = 10, size: number = 2){
    super()
    this.health = health
    this.size = size
  }
}

// TODO break this up into multiple components and a component flag isEnemy
export class EnemyStateComponent extends Component {
  health: number
  speed: number
  color: string
  size: number
  type: string
  wave: EnemyWave
  group: EnemyGroup

  constructor(wave: EnemyWave, group: EnemyGroup, type: string = "1", speed: number = .1, health: number = 10, size: number = 1){
    super()
    this.wave = wave
    this.group = group
    this.type = type
    this.speed = speed
    this.health = health
    this.color = 'red'
    this.size = size
  }
}


// TODO break this up into multiple components and a component flag isPlayer
export class PlayerStateComponent extends Component {
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
    super()
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


export class FillComponent extends Component {
  fillStyle: string | CanvasGradient | CanvasPattern
  constructor(fillStyle: FillComponent['fillStyle']){
    super()
    this.fillStyle = fillStyle
  }
}

export class GamepadComponent extends Component {
  index: number
  constructor(){
    super()
    this.index = -1
  }
}

export class MechComponent extends Component {
  type: string

  constructor(){
    super()
    this.type = ''
  }
}

export class MovementComponent extends Component {
	public velocity: Vector2 = new Vector2()
	public accel: Vector2 = new Vector2()

  constructor(velocity: Vector2, accel: Vector2){
    super()
    this.velocity = velocity
    this.accel = accel
  }
}

export class PositionComponent extends Component {
	x: number
	y: number

  constructor(){
    super()
    this.x = 0
    this.y = 0
  }
}

export type RenderFn = (ctx: CanvasRenderingContext2D, ...args: any[]) => void

export class RenderComponent  extends Component {
	public renderFn: RenderFn

  constructor(renderFn: RenderFn){
    super()
    this.renderFn = renderFn
  }
}


const TILE_COLORS = {
  '1': {r:46,  g:204, b:113, a:0},
  '2': {r:52,  g:152, b:219, a:0},
  '3': {r:155, g: 89, b:182, a:0},
  '4': {r:241, g:196, b:15,  a:0},
  '5': {r:231, g:76,  b:60,  a:0}
}

export type TileType =  "1" | "2" | "3" | "4" | "5"

export class TileStateComponent extends Component {
  active: boolean
  tileType: string
  playersOn: Player[]
  building: boolean = false

  private _color: string
  private _fill: string

  constructor(tileType: TileType = '1', active: boolean = false){
    super()
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


const MAP = new WeakMap<TowerMenuComponent, TowerMenu>()
export class TowerMenuComponent extends Component {
  constructor(component?: TowerMenu){
    super()
    MAP.set(this, component || new TowerMenu())
    Ludic.ui.add(this.component)
  }

  get component(){
    return MAP.get(this)
  }
}

// TODO break this up into multiple components and a component flag isCastle
export class TowerStateComponent extends Component {
  type: string
  color: string
  size: number

  constructor(type: string = "1"){
    super()
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


export class isPlayerComponent extends TagComponent {}
export class isTowerComponent extends TagComponent {}
export class isTileComponent extends TagComponent {}
export class isCastleComponent extends TagComponent {}
export class isEnemyComponent extends TagComponent {}



export class MapConfigComponent extends Component {
  value: any
  constructor(){
    super()
  }

  reset(){
    this.value = null
  }
}


export class SizeComponent extends Component {
  value: number
  constructor(){
    super()
  }

  reset(){
    this.value = 0
  }
}


export class CubeCoordinateComponent extends Component {
  x: number
  y: number
  z: number

  constructor(){
    super()
  }

  reset(){
    this.x = 0
    this.y = 0
    this.z = 0
  }
}
