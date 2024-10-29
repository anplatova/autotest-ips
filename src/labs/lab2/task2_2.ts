type Student = {
    name: string,
    age: number
}

const students: Student[] = [{
    name: 'Юля',
    age: 20
},
{
    name: 'Вася',
    age: 19
},
{
    name: 'Ирина',
    age: 22
},
{
    name: 'Ксюша',
    age: 18
}]

for (const student of students) {
    console.log(`${student.name}, ${student.age}`)
}