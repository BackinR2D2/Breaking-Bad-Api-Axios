require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3030
const path = require('path')
const axios = require('axios')

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', async (req, res) => {

    try {
        let api = await axios.get('https://www.breakingbadapi.com/api/characters')
        res.render('hp', { api: api, favicon: process.env.favicon })
    } catch (error) {
        console.log(error.message)
    }
})

app.get('/search', async (req, res) => {
    try {
        const name = req.query.name;
        if (name !== undefined) {
            name.split('')
            let newName = name.replace(' ', '+')
            let getName = await axios.get(`https://www.breakingbadapi.com/api/characters?name=${newName}`)
            res.render('search', { name: getName.data, favicon: process.env.favicon })
        } else {
            let allName = await axios.get(`https://www.breakingbadapi.com/api/characters?name=`)
            res.render('search', { name: allName.data, favicon: process.env.favicon })
        }
    } catch (error) {
        console.log(error.message);
    }
})

app.use((req, res, next) => {
    const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    res.status(404).render('404', { failUrl: fullUrl, favicon: process.env.favicon })
    next()
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})