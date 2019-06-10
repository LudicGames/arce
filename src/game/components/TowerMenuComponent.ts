import { Component } from '@ludic/ein'
import TowerMenu from '../ui/towerMenu';
import Ludic from '@ludic/ludic';

const MAP = new WeakMap<TowerMenuComponent, TowerMenu>()

export default class TowerMenuComponent extends Component {

  constructor(component?: TowerMenu){
    super()
    MAP.set(this, component || new TowerMenu())
    Ludic.ui.add(this.component)
  }

  get component(){
    return MAP.get(this)
  }
}