const express = require('express')
const app = express()
const port = 3000
const connnection = require("./db")
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  connnection.query(
    "SELECT * FROM user_address",
    function (err, data, fields) {
      if (err) {
        return res.status(500).json({
          message: "failed",
          err,
        })
      }
      return res.status(200).json({
        status: "success",
        length: data?.length,
        data: data,
      })
    }
  )
})

app.post('/add', (req, res) => {
  if (!req.body) {
    return res.status(404).json({
      message: 'No request data found',
    })
  }
  const values = [req.body.name, req.body.address, req.body.phone];
  connnection.query(
    "INSERT INTO user_address (name, address, phone) VALUES(?)",
   [values],
    function (err, data, fields) {
      if (err) {
        return res.status(500).json({
          status: "failed",
          err,
        })
      }
      return res.status(200).json({
        status: "success",
        length: data?.length,
        data: data,
      })
    }
  )
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})