function printNumbers() {
    let number = 1

    console.log(number)
    number++
    setTimeout(printNumbers, 1000)
}

printNumbers()

//поизучать рекурсию
