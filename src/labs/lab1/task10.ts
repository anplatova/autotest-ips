function time(i: number) {
    console.log(i)
}

function printNumbers() {
    for (let i = 1; i <= 100; i++) {
        setTimeout(() => time(i), i * 1000)
    }
}

printNumbers()