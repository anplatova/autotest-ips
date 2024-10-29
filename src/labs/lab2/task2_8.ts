class Car {
    private isTurnedOn: boolean = false
    private speed: number = 0

    public turnOn() {
        this.isTurnedOn = true
    }

    public turnOff() {
        this.isTurnedOn = false
    }

    public getState() {
        if (this.isTurnedOn) {
            console.log("Двигатель включен", this.speed)
        } else {
            console.log("Двигатель выключен", this.speed)
        }
    }

    public setSpeed(newSpeed: number) {
        if (this.isTurnedOn) {
            if (newSpeed >= 0 && newSpeed <= 100) {
                this.speed = newSpeed
                console.log(`Скорость = ${this.speed}`)
            } else {
                console.log("Скорость должна быть от 0 до 100")
            }
        } else {
            console.log("Двигатель выключен")
        }
    }
}

const car = new Car()
car.getState()
car.turnOn()
car.getState()
car.setSpeed(150)
car.getState()