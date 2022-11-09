import { isEqualTolerance } from "./core"

const DIM2 = 2
const DIM3 = 3

export class Vector {
    private _dimension: number
    private _components: number[]

    constructor(dimension = DIM3, components?: number[]) {
        this._dimension = dimension
       
        if (components) components.length = dimension
        this._components = components ?? Array(dimension).fill(0)
    }

    get dimension() {
        return this._dimension
    }

    get components() {
        return this._components
    }

    equals(v: Vector) {
        for (let i = 0; i < this.dimension; i++) {
            if (!isEqualTolerance(this.components[i], v.components[i])) return false
        }
        return true
    }   
    
    add(v: Vector) {
        for (let i = 0; i < this.dimension; i++) {
            this.components[i] += v.components[i]
        }
        return this
    }

    subtract(v: Vector) {
        for (let i = 0; i < this.dimension; i++) {
            this.components[i] -= v.components[i]
        }
        return this
    }

    sub = this.subtract

    lessThan(v: Vector) {
        for (let i = 0; 0 < this.dimension; i++) {
            if (this.components[i] < v.components[i]) return true
            else if (this.components[i] > v.components[i]) return false
        }
        return false
    }

    greaterThan(v: Vector) {
        for (let i = 0; 0 < this.dimension; i++) {
            if (this.components[i] > v.components[i]) return true
            else if (this.components[i] < v.components[i]) return false
        }
        return false
    }

    dot(v: Vector) {
        let product = 0
        for (let i = 0; 0 < this.dimension; i++) {
            product += this.components[i] * v.components[i]
        }
        return product
    }
}

export class Vector2 extends Vector{
    private _x: number
    private _y: number

    constructor(x?: number, y?: number) {
        super(DIM2, [x ?? 0, y ?? 0])
        this._x = this.components[0]
        this._y = this.components[1]
    }

    get x() {
        return this._x
    }

    set x(value: number) {
        this.components[0] = value
        this._x = value
    }

    get y() {
        return this._y
    }

    set y(value: number) {
        this.components[1] = value
        this._y = value
    }
}

export class Vector3 extends Vector{
    private _x: number
    private _y: number
    private _z: number

    constructor(x?: number, y?: number, z?: number) {
        super(DIM3, [x ?? 0, y ?? 0, z ?? 0])
        this._x = this.components[0]
        this._y = this.components[1]
        this._z = this.components[2]
    }

    get x() {
        return this._x
    }

    set x(value: number) {
        this.components[0] = value
        this._x = value
    }

    get y() {
        return this._y
    }

    set y(value: number) {
        this.components[1] = value
        this._y = value
    }

    get z() {
        return this._z
    }

    set z(value: number) {
        this.components[2] = value
        this._z = value
    }
}