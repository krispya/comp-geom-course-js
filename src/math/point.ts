import { Vector2, Vector3 } from './vector';

export class Point2 extends Vector2 {
	constructor(x?: number, y?: number) {
		super(x, y);
	}
}

export class Point3 extends Vector3 {
	constructor(x?: number, y?: number, z?: number) {
		super(x, y, z);
	}
}
