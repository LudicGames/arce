import { Component } from '@ludic/ein'
import { Vector2 } from '@ludic/ludic'

export default class MovementComponent extends Component {
	public velocity: Vector2 = new Vector2()
	public accel: Vector2 = new Vector2()
}
