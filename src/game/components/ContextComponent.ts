import { Camera, Context } from '@ludic/ludic'
import { Component } from 'ecsy'

export default class ContextComponent extends Component {
  value: Context

  constructor(){
    super()
    this.reset()
  }

  reset(){
    this.value = null
  }
}
