import { Component } from '@ludic/ein'

export default class FillComponent extends Component {
  fillStyle: string | CanvasGradient | CanvasPattern
  constructor(fillStyle: FillComponent['fillStyle']){
    super()
    this.fillStyle = fillStyle
  }
}