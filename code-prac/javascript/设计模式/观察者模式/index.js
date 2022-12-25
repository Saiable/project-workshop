// 定义主题 Subject
function Subject(name, state) {
    this.name = name
    this.state = state
    this.observers = []
    this.attach = function (observerInstance) {
        this.observers.push(observerInstance)
        return this
    }
    this.detach = function (observerInstance) {
        this.observers.forEach((ob, index, obs) => {
            if(ob.name === observerInstance.name) {
                obs.splice(index, 1)
            }
        })
        return this
    }
    this.setState = function (state) {
        this.state = state
        // 循环取出每个观察者
        this.observers.forEach(item => {
            item.watch(this) // 向Observer传递最新的Subject实例
        })
    }
}

// 定义观察者 Observer
function Observer(name) {
    // 可以有多个观察者
    this.name = name
    this.watch = function (subjectInstance) {
        console.log(`${this.name}: 观察到${subjectInstance.name}的状态是${subjectInstance.state}`)
    }

}

let baby = new Subject('baby', '开心')
let father = new Observer('father')
let mother = new Observer('mother')

baby.attach(father).attach(mother)
// baby.setState('不开心')

baby.detach(father)
