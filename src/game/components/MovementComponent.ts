import Component from 'ein'
import Vector2 from '../utils/Vector2'

export default class MovementComponent implements Component {
	public velocity: Vector2 = new Vector2()
	public accel: Vector2 = new Vector2()
}
