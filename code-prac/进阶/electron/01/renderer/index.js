document.querySelector('#btn').addEventListener('click', () => {
    console.log('btn')
    const {handleSend} = myApi
    handleSend('haha')

})