import { Component } from '@ludic/ein'

export { default as CameraComponent } from './CameraComponent'
export { default as CubeCoordinateComponent } from './CubeCoordinateComponent'
export { default as DestinationCubeComponent } from './DestinationCubeComponent'
export { default as EnemyStateComponent } from './EnemyStateComponent'
export { default as GamepadComponent } from './GamepadComponent'
export { default as HealthComponent } from './HealthComponent'
export { default as InputFocusComponent } from './InputFocusComponent'
export { default as MechComponent } from './MechComponent'
export { default as PlayerStateComponent } from './PlayerStateComponent'
export { default as PositionComponent } from './PositionComponent'
export { default as PreviousCubeComponent } from './PreviousCubeComponent'
export { default as SizeComponent } from './SizeComponent'
export { default as SpeedComponent } from './SpeedComponent'
export { default as TileStateComponent } from './TileStateComponent'
export { default as TowerMenuStateComponent } from './TowerMenuStateComponent'
export { default as TowerTypeComponent } from './TowerTypeComponent'


// Probably bullshit that should get removed
export class isTowerMenu extends Component {}
export class isPlayerComponent extends Component {}
export class isTowerComponent extends Component {}
export class isTileComponent extends Component {}
export class isCastleComponent extends Component {}
export class isEnemyComponent extends Component {}

export class MapConfigComponent extends Component {
  value: any
  constructor(){
    super()
  }

  reset(){
    this.value = null
  }
}

export class EnemyConfigComponent extends Component {
  value: any
  constructor(){
    super()
    this.reset()
  }

  reset(){
    this.value = null
  }
}

export class PlayerConfigComponent extends Component {
  value: any
  constructor(){
    super()
    this.reset()
  }

  reset(){
    this.value = null
  }
}
