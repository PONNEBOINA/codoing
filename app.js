const express = require('express')
const path = require('path')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const app = express()
const dbPath = path.join(__dirname, 'cricketTeam.db')
let db = null
const initilizerserver = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('server is running at http://localhost:3000')
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}
initilizerserver()

//get players

app.get('/players', async (request, response) => {
  const allplayersquery = `
  SELECT * FROM cricket_team `
  const allplayers = await db.all(allplayersquery)
  response.send(allplayers)
})

//

app.post('/players', async (request, response) => {
  const playerdetails = request.body
  const {playerName, jerseyNumber, role} = playerdetails
  const playerinsertquery = `
  INSERT INTO cricket_team VALUES (
   
    '${playerName}'
    '${jerseyNumber}'
    '${role}'
  
  ) `
  const dbresponse = await db.run(playerinsertquery)
  const playerId = dbresponse.lastID
  response.send('Player Added to Team')
})
