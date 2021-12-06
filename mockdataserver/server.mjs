import express from 'express'
import cors from 'cors'

const app = express()
const port = 3033

app.use(cors())

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
    },
}

app.get('/tasks', (req, res) => {
    console.log('/tasks')
    res.send(data.tasks)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
