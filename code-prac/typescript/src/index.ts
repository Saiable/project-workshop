type IFn = (x: number, y: number) => number
let res: IFn = (x, y) => {
    return x + y
}
res('a', 2)