export enum RELATIVE_POSITION {
	LEFT,
	RIGHT,
	BEHIND,
	BEYOND,
	BETWEEN,
	ORIGIN,
	DESTINATION,
}

export const TOLERANCE = 1e-7;

export function isEqualTolerance(x: number, y: number) {
	return Math.abs(x - y) < TOLERANCE;
}
