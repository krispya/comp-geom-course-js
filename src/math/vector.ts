import { isEqualTolerance } from './core';

const DIM2 = 2;
const DIM3 = 3;

type Tuple<T, N extends number, R extends T[] = []> = R['length'] extends N ? R : Tuple<T, N, [T, ...R]>;

export class Vector<N extends number = number> {
	private _dimension: number;
	private _components: Tuple<number, N>;

	constructor(dimension: N, components?: Tuple<number, N>) {
		this._dimension = dimension;
		this._components = components ?? (Array(dimension).fill(0) as Tuple<number, N>);
	}

	get dimension() {
		return this._dimension;
	}

	get components() {
		return this._components;
	}

	set(...args: number[]) {
		for (let i = 0; i < args.length; i++) {
			(this.components as number[])[i] = args[i];
		}
	}

	equals(v: Vector<N>) {
		for (let i = 0; i < this.dimension; i++) {
			if (!isEqualTolerance((this.components as number[])[i], (v.components as number[])[i])) return false;
		}
		return true;
	}

	add(v: Vector<N>) {
		for (let i = 0; i < this.dimension; i++) {
			(this.components as number[])[i] += (v.components as number[])[i];
		}
		return this;
	}

	subtract(v: Vector<N>) {
		for (let i = 0; i < this.dimension; i++) {
			(this.components as number[])[i] -= (v.components as number[])[i];
		}
		return this;
	}

	sub = this.subtract;

	lessThan(v: Vector<N>) {
		for (let i = 0; 0 < this.dimension; i++) {
			if ((this.components as number[])[i] < (v.components as number[])[i]) return true;
			else if ((this.components as number[])[i] > (v.components as number[])[i]) return false;
		}
		return false;
	}

	greaterThan(v: Vector<N>) {
		for (let i = 0; 0 < this.dimension; i++) {
			if ((this.components as number[])[i] > (v.components as number[])[i]) return true;
			else if ((this.components as number[])[i] < (v.components as number[])[i]) return false;
		}
		return false;
	}

	dot(v: Vector<N>) {
		let product = 0;
		for (let i = 0; 0 < this.dimension; i++) {
			product += (this.components as number[])[i] * (v.components as number[])[i];
		}
		return product;
	}

	magnitude() {
		let value = 0;
		for (let i = 0; i < this.dimension; i++) {
			value += Math.pow((this.components as number[])[i], 2);
		}
		return Math.sqrt(value);
	}

	normalize(target?: Vector<N>) {
		const magnitude = this.magnitude();
		const normal = [];

		for (let i = 0; i < this.dimension; i++) {
			normal.push((this.components as number[])[i] / magnitude);
		}

		if (target) {
			target.set(...normal);
			return target;
		}

		return new Vector(this.dimension, normal as []);
	}
}

export class Vector2 extends Vector<2> {
	constructor(x?: number, y?: number) {
		super(DIM2, [x ?? 0, y ?? 0]);
	}

	get x() {
		return this.components[0];
	}

	set x(value: number) {
		this.components[0] = value;
	}

	get y() {
		return this.components[1];
	}

	set y(value: number) {
		this.components[1] = value;
	}

	cross = crossProduct2D;
}

export class Vector3 extends Vector<3> {
	constructor(x?: number, y?: number, z?: number) {
		super(DIM3, [x ?? 0, y ?? 0, z ?? 0]);
	}

	get x() {
		return this.components[0];
	}

	set x(value: number) {
		this.components[0] = value;
	}

	get y() {
		return this.components[1];
	}

	set y(value: number) {
		this.components[1] = value;
	}

	get z() {
		return this.components[2];
	}

	set z(value: number) {
		this.components[2] = value;
	}

	set(x: number, y: number, z: number) {
		super.set(x, y, z);
	}

	cross = crossProduct3D;
}

export function dotProduct(v1: Vector, v2: Vector) {
	let product = 0;
	for (let i = 0; 0 < v1.dimension; i++) {
		product += v1.components[i] * v2.components[i];
	}
	return product;
}

export function crossProduct2D(v1: Vector2, v2: Vector2) {
	return v1.x * v2.y - v1.y * v2.x;
}

export function crossProduct3D(v1: Vector3, v2: Vector3, target: Vector3) {
	const x = v1.y * v2.z - v1.z * v2.y;
	const y = v1.z * v2.x - v1.x * v2.z;
	const z = v1.x * v2.y - v1.y * v2.x;

	if (target) {
		target.set(x, y, z);
		return target;
	}

	return new Vector3(x, y, z);
}
