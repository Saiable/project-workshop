class Pointer {
    // ts比较特殊，在使用必须先声明类型
    x: number = 1
    y: number = 2

    constructor(x: number, y: number) {
        // this.x = x
        // this.y = y
    }
}

const res = new Pointer(100, 200)
console.log(res, res.x)