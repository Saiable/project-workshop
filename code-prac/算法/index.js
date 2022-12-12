const arr = [7, 2, 3, 2, 6, 9 ,0 ,11,11]

let getMin = function getMin(arr) {
    let minValue = 0,
    minIndex = 0
    arr.forEach((item, index) => {
        if (index === 0) {
            minValue = item
            return
        }
        if (item <= minValue) {
            minValue = item
            minIndex = index
        }
    })
    // console.log('最小值', minValue, minIndex)
    return { minValue, minIndex }
}



let filterMinAndMax = function filterMinAndMax(minIndex, maxIndex, arr) {
    let newArr = []
    arr.forEach((item, index) => {
        if (index === minIndex || index === maxIndex) return
        newArr.push(item)
    })
    return newArr
}

let sortArray = [], newArr = []
let main = function main(arr) {
    if(arr.length === 0 ) return
    if(arr.length === 1) {
        let onlyValue = arr[0]
        const insertIndex = sortArray.length / 2
        if(onlyValue > sortArray[insertIndex]) {
            sortArray.splice(insertIndex + 1, 0, onlyValue)
        } else {
            sortArray.splice(insertIndex, 0, onlyValue)
        }

        console.log('res', sortArray)
        return
    }

    if(arr.length > 1) {
        let { minValue, minIndex } = getMin(arr)
        let { maxValue, maxIndex } = getMax(arr)
        console.log( minValue, maxValue)
        if(sortArray.length % 2 === 0){
            const insertIndex = sortArray.length / 2
            sortArray.splice(insertIndex, 0, minValue, maxValue)
            console.log('sortArray', sortArray)
        }
    
    
        newArr = filterMinAndMax(minIndex, maxIndex, arr)
        console.log('newArr', newArr)
    }

    main(newArr)
}
// getMax(arr)
main(arr)
