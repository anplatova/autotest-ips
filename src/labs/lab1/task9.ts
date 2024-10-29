let evenNumbers: string = ''
let oddNumbers: string = ''

for (let i = 0; i <= 100; i++) {
    if (i % 2 == 0) {
        evenNumbers += `${i} `
    }
    if (i % 2 != 0) {
        oddNumbers += `${i} `
    }
}

console.log(`Четные: ${evenNumbers}`)
console.log(`Нечетные: ${oddNumbers}`)