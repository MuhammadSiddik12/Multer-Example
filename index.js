const express = require('express')
const app = express()
require('dotenv').config()
const multer = require('multer')
const path = require('path')

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname)
    }
})

const upload = multer({ storage: fileStorage })

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/single', upload.single("image"), (req, res) => {
    console.log(req.file)
    res.send('single file upload success')
})

app.post('/multiple', upload.array("images", 2), (req, res) => {
    console.log(req.files)
    res.send('multiple files upload success')
})

app.listen(process.env.PORT, () => console.log(`server is running on port ${process.env.PORT}`))