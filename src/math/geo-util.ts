import { RELATIVE_POSITION, TOLERANCE } from './core';
import { Point2 } from './point';
import { crossProduct2D } from './vector';

const pool = {
	pA: new Point2(),
	pB: new Point2(),
};

export function areaTriangle2d(a: Point2, b: Point2, c: Point2) {
	const ab = pool.pA.copy(b).subtract(a);
	const ac = pool.pB.copy(c).subtract(a);
	const cross = crossProduct2D(ab, ac);

	return cross / 2;
}

export function orientation2d(a: Point2, b: Point2, c: Point2): RELATIVE_POSITION {
	const ab = pool.pA.copy(b).subtract(a);
	const ac = pool.pB.copy(c).subtract(a);

	let area = areaTriangle2d(a, b, c);

	if (area > 0 && area < TOLERANCE) area = 0;
	if (area < 0 && area > TOLERANCE) area = 0;

	// Area coefficient lets us know if we are left or right.
	if (area > 0) return RELATIVE_POSITION.LEFT;
	if (area < 0) return RELATIVE_POSITION.RIGHT;

	// Parallel but negative vector.
	if (ab.x * ac.x < 0 || ab.y * ac.y < 0) return RELATIVE_POSITION.BEHIND;

	// Parallel but larger magnitude.
	if (ab.magnitude() < ac.magnitude()) return RELATIVE_POSITION.BEYOND;

	// At origin or destination points.
	if (c.equals(a)) return RELATIVE_POSITION.ORIGIN;
	if (c.equals(b)) return RELATIVE_POSITION.DESTINATION;

	// If all else fails we are on the vector.
	return RELATIVE_POSITION.BETWEEN;
}
