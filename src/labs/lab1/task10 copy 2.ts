
function printNumbers() {
    let number = 1

    const printNext = () => {
        console.log(number)
        number++
        setTimeout(printNext, 1000)
    }

    setTimeout(printNext, 1000)
}

printNumbers();