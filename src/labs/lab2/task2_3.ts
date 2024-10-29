class Car {
    private isTurnedOn: boolean = false

    public turnOn() {
        this.isTurnedOn = true
    }

    public turnOff() {
        this.isTurnedOn = false
    }

    public getState() {
        if (this.isTurnedOn) {
            console.log("Двигатель включен")
        } else {
            console.log("Двигатель выключен")
        }
    }
}

const car = new Car()
car.getState() //выводит текущее состояние
car.turnOn() //включает двигатель
car.getState() //состояние после включения