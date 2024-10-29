const sum = (a: number, b: number) => {
    console.log(`sum is: ${a + b}`)
}
const min = (a: number, b: number) => {
    console.log(`min is: ${a - b}`)
}
const mult = (a: number, b: number) => {
    console.log(`mult is: ${a * b}`)
}
const del = (a: number, b: number) => {
    console.log(`del is: ${a / b}`)
}

function calc(
    callback: (a: number, b: number) => void,
    a: number,
    b: number
) {
    callback(a, b)
}
calc(sum, 5, 4)
calc(min, 5, 4)
calc(mult, 5, 4)
calc(del, 5, 4)