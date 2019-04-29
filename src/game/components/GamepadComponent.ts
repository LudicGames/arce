import { Component } from '@ludic/ein'

export default class GamepadComponent implements Component {
  index: number
  constructor(index: number){
    this.index = index
  }
}