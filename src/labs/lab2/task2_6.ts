const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('resolve')
    }, 1000)
    setTimeout(() => {
        reject('123')
    }, 100)
})

promise
    .then(value => console.log(value))
    .catch(error => console.log(error))