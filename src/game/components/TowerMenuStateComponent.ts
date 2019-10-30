import { SystemStateComponent } from 'ecsy'

export default class TowerMenuStateComponent extends SystemStateComponent {
  index: number
  constructor(){
    super()
    this.reset()
  }
  reset(){
    this.index = 0
  }
}
