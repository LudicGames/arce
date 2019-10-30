import { Component, TagComponent } from 'ecsy'

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
export class isTowerMenu extends TagComponent {}
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
