import { Vector2 } from '@ludic/ludic'

export const Vector2Distance = function(p1: Vector2, p2: Vector2): number {
  return Math.sqrt((Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)))
}

export const Vector2Normalize = function(vec: Vector2): Vector2 {
  const length = Math.sqrt(vec.x * vec.x + vec.y * vec.y)
  return new Vector2(vec.x / length, vec.y / length)
}
