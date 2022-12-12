const myinput = document.querySelector('.myinput'),
    btn = document.querySelector('.calc'),
    res = document.querySelector('.value')


// const inputValue = Number(myinput.value)

const validateNumber = function validateNumber() {
        const inputValue = myinput.value
        if(inputValue === '') {
            res.innerHTML = '请输入'
            return
        }
    
        const numberValue = Number(inputValue)

        if(!isNaN(numberValue)) {
            if(numberValue === 0) {
                    res.innerHTML = `输入为：${inputValue}`
            } else {
                res.innerHTML = numberValue > 0 ? `结果为：${numberValue}，正数` : `结果为：${numberValue}，负数`
            }
        } else {
            res.innerHTML = `输入为：${inputValue}，请输入有效数字`
        }
}
btn.addEventListener('click', validateNumber)

myinput.addEventListener('keydown', function(event) {
    if(event.keyCode === 13) {
        validateNumber()
    }
})
