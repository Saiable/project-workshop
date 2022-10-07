const myinput = document.querySelector('.myinput'),
    btn = document.querySelector('.calc'),
    res = document.querySelector('.value')


// const inputValue = Number(myinput.value)


btn.addEventListener('click', function (){
    const inputValue = myinput.value
    console.log(inputValue)

    if(inputValue === '') {
        res.innerHTML = '结果为：请输入'
    }
    if(typeof inputValue !== 'number') {
        console.log('非数字，请重新输入')
    } else {
        console.log(inputValue)
    }
})