function toUpperCase(target: any, key: string) { // target指的是原型
    let val: string = ''
    Object.defineProperty(target, key, {
        get() {
            return val.toUpperCase()
        },
        set(newVal: string) { //给原型对象上，赋值的时候，就会触发set
            val = newVal
        }
    })
}

function double(num:number) {
    return function (target:any, key:string) { // target指向类
        let val:number = target[key]
        Object.defineProperty(target, key,  {
            get() {
                return val * 2
            }
        })
    }
}
class Person {
    @toUpperCase
    public name: string = 'sai'

    @double(2)
    static age:number = 18
}

let p = new Person()
console.log(p.name, Person.age)
