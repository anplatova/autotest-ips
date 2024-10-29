async function print() {
    const promise = new Promise((resolve) => {
        setTimeout(() => {
            resolve('Fullfield')
        }, 1000)
    })
    promise.then(value => console.log(value))
}
print()