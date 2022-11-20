let arr = [12, 34, 56, 78]
arr.splice(arr.length, 0, 'AA')
console.log(arr) // [12, 34, 56, 78, 'AA']
arr.splice(0, 0, 'BB')
console.log(arr) // ['BB', 12, 34, 56, 78, 'AA']