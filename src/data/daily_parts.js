
const date = (daysDiff)=>{

    const today = new Date()
  
    const customDate = new Date(today.setDate(today.getDate() + daysDiff))
    return customDate
}



const dailyPart = [
    {
        id: 1,
        client: "Vale",
        date: date(-5),
        driver: {
            registration: 2075,
            name: "Divanir de Jesus Silva"
        },
        car: {
            number: 51521,
            plate: "QQX-2526"
        },
        travels: [
            {
                line: "A01",
                startTime:"05:45",
                endTime:"07:10",
                startKM:129555,
                endKM:129598,
                amountPesenger:5,
                origin:"PC1",
                destiny:'PC2'
            },
            {
                line: "A01",
                startTime:"07:45",
                endTime:"09:10",
                startKM:129655,
                endKM:129698,
                amountPesenger:5,
                origin:"PC1",
                destiny:'PC2'
            }

        ]
    },

    {
        id: 2,
        client: "Vale",
        date: date(0),
        driver: {
            registration: 2075,
            name: "Divanir de Jesus Silva"
        },
        car: {
            number: 51521,
            plate: "QQX-2526"
        },
        travels: [
            {
                line: "A02",
                startTime:"05:45",
                endTime:"07:10",
                startKM:129555,
                endKM:129598,
                amountPesenger:5,
                origin:"PC1",
                destiny:'PC2'
            },
            {
                line: "A01",
                startTime:"07:45",
                endTime:"09:10",
                startKM:129655,
                endKM:129698,
                amountPesenger:5,
                origin:"PC1",
                destiny:'PC2'
            },
            {
                line: "A01",
                startTime:"07:45",
                endTime:"09:10",
                startKM:129655,
                endKM:129698,
                amountPesenger:5,
                origin:"PC1",
                destiny:'PC2'
            },
            {
                line: "A01",
                startTime:"07:45",
                endTime:"09:10",
                startKM:129655,
                endKM:129698,
                amountPesenger:5,
                origin:"PC1",
                destiny:'PC2'
            }

        ]
    },

    {
        id: 3,
        client: "Vale",
        date: date(-21),
        driver: {
            registration: 2075,
            name: "Divanir de Jesus Silva"
        },
        car: {
            number: 51521,
            plate: "QQX-2526"
        },
        travels: [
            {
                line: "A02",
                startTime:"05:45",
                endTime:"07:10",
                startKM:129555,
                endKM:129598,
                amountPesenger:5,
                origin:"PC1",
                destiny:'PC2'
            }

        ]
    },
    {
        id: 5,
        client: "Fiat",
        date: date(-1),
        driver: {
            registration: 2075,
            name: "Divanir de Jesus Silva"
        },
        car: {
            number: 51521,
            plate: "QQX-2526"
        },
        travels: [
            {
                line: "D303",
                startTime:"05:45",
                endTime:"07:10",
                startKM:129555,
                endKM:129598,
                amountPesenger:5,
                origin:"PC1",
                destiny:'PC2'
            }

        ]
    },

    {
        id: 4,
        client: "Vale",
        date: date(2),
        driver: {
            registration: 2075,
            name: "Divanir de Jesus Silva"
        },
        car: {
            number: 51521,
            plate: "QQX-2526"
        },
        travels: [
            {
                line: "A02",
                startTime:"05:45",
                endTime:"07:10",
                startKM:129555,
                endKM:129598,
                amountPesenger:5,
                origin:"PC1",
                destiny:'PC2'
            },
            {
                line: "A01",
                startTime:"07:45",
                endTime:"09:10",
                startKM:129655,
                endKM:129698,
                amountPesenger:5,
                origin:"PC1",
                destiny:'PC2'
            },
            {
                line: "A01",
                startTime:"07:45",
                endTime:"09:10",
                startKM:129655,
                endKM:129698,
                amountPesenger:5,
                origin:"PC1",
                destiny:'PC2'
            },
            {
                line: "A01",
                startTime:"07:45",
                endTime:"09:10",
                startKM:129655,
                endKM:129698,
                amountPesenger:5,
                origin:"PC1",
                destiny:'PC2'
            },
            {
                line: "A01",
                startTime:"07:45",
                endTime:"09:10",
                startKM:129655,
                endKM:129698,
                amountPesenger:5,
                origin:"PC1",
                destiny:'PC2'
            },
            {
                line: "A01",
                startTime:"07:45",
                endTime:"09:10",
                startKM:129655,
                endKM:129698,
                amountPesenger:5,
                origin:"PC1",
                destiny:'PC2'
            }

        ]
    }
]

export default dailyPart