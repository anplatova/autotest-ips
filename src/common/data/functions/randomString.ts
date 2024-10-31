function getRandomString(lengthOfString: number): string {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < lengthOfString; i++) {
        result += characters.charAt(Math.random() * characters.length)
    }
    return result
}

console.log(getRandomString(10))

export {
    getRandomString,
}