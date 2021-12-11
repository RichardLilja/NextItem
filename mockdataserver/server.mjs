import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
const port = 3033

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const data = {
    user: {
        id: '0',
        firstName: 'Richard',
        lastName: 'Lilja',
    },
    tasks: {
        small: [
            {
                id: '123',
                text: 'Här står det en enkelt beskrivning av vad som behöver göras.',
            },
            {
                id: '234',
                text: 'I framtiden kan dessa kort uppdateras med meta-info.',
            },
        ],
        medium: [
            {
                id: '345',
                text: 'Denna data kommer just nu frpn MDS/tasks.',
            },
            {
                id: '456',
                text: 'Så vi kommer behöva byta till AWS sen.',
            },
        ],
        large: [
            {
                id: '567',
                text: 'Men först vill vi ha ett riktigt soft gränssnitt.',
            },
            {
                id: '678',
                text: 'Så det räcker med en devserver just nu.',
            },
        ],
        extraLarge: [
            {
                id: '789',
                text: 'Fan. Funderar på om det hade varit bättre att bygga mobile first :D',
            },
        ],
        archive: [
            {
                id: '888',
                text: 'Denna task är arkiverad',
                archiveDate: '',
            },
        ],
    },
}

const findTaskByID = (list, id) => {
    return list.find(item => item.id === id)
}

app.get('/tasks', (req, res) => {
    console.log('GET /tasks')
    res.send(data.tasks)
})

app.put('/tasks', (req, res) => {
    console.log('PUT /tasks')
    data.tasks = req.body
    res.send(data.tasks)
})

app.delete('/tasks/:taskId', (req, res) => {
    console.log(`DELETE /tasks/${req.params.taskId}`)

    const arr = [
        data.tasks.small,
        data.tasks.medium,
        data.tasks.large,
        data.tasks.extraLarge,
    ]

    arr.forEach(list => {
        const found = findTaskByID(list, req.params.taskId)

        if (found) {
            const index = list.indexOf(found)

            list.splice(index, 1)

            const today = new Date()
            const archiveDate =
                today.getFullYear() +
                '-' +
                (today.getMonth() + 1) +
                '-' +
                today.getDate()
            found.archiveDate = archiveDate

            data.tasks.archive.push(found)
        }
    })

    res.send(data.tasks)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
