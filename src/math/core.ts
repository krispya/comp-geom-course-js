const TOLERANCE = 1e-7

export function isEqualTolerance(x: number, y: number) {
    return Math.abs(x - y) < TOLERANCE
}