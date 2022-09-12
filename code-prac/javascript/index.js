function mygetElementsByClassName(node, classname) {
    // if(node.getElementsByClassName) {
    //     return node.getElementsByClassName(classname)
    // } else {
    //     let results = new Array()
    //     let elems = node.getElementsByTagName('*')
    //     for(let i = 0; i < elems.length; i++) {
    //         if(elems[i].className.indexOf(classname) != -1) {
    //             return results[results.length] = elems[i]
    //         }
    //     }
    //     console.log(results)
    //     return results
    // }

    let results = new Array()
    let elems = node.getElementsByTagName('*')
    for(let i = 0; i < elems.length; i++) {
        if(elems[i].className.indexOf(classname) != -1) {
            return results[results.length] = elems[i]
        }
    }
    console.log(results)
    return results
}
let items = mygetElementsByClassName(document, 'important')
console.log(items)