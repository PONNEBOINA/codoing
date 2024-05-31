const express = require('express')

const path = require('path')

const {open} = require('sqlite')

const sqlite3 = require('sqlite3')

const app = express()
app.use(express.json())
const dbpath = path.join(__dirname, 'cricketTeam.db')

let db = null

const initilizationserver = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('server is running at http://localhost:3000')
    })
  } catch (e) {
    console.log(`DB error:${e.message}`)
    process.exit(1)
  }
}

initilizationserver()

//get players API
app.get('/players/', async (request, response) => {
  const getplayerquery = `
    SELECT 
        * 
    FROM
        cricket_team
    
    `
  const playerarray = await db.all(getplayerquery)
  response.send(playerarray)
})

//add player API
app.post('/players/', async (request, response) => {
  const newplayer = request.body
  const {playername, jerseyNumber, role} = newplayer

  const playerquery = `
    INSERT INTO
    cricket_team(playername,
        jerseyNumber,
        role)
       VALUES
       '${playername}',
       ${jerseyNumber},
       ${role}
    `
  const addedplayer = await db.all(playerquery)
  response.send('Player Added to Team')
})

//GET PLAYER
app.get('/players/:playerId/', async (request, response) => {
  const {player_id} = request.params
  const getplayerquery = `
    SELECT * FROM cricket_team
    WHERE
    player_id=${player_id}: `
  const player = await db.get(getplayerquery)
  response.send(player)
})

//update details

app.put('/players/:playersId/', async (request, response) => {
  const {playersId} = request.params
  const playerdatails = request.body
  const {playerName, jerseyNumber, role} = playerdatails
  const updateplayer = `
  UPDATE  cricket_team
  SET 
  playerName = '${Maneesh}',
   jerseyNumber =${54},
    role=${All - rounder}
    WHERE 
    player_id=${playersId}`
  const updated = await db.run(updateplayer)
  response.send('Player Details Updated')
})

//delete api
app.delete('/players/:playerId/', async (request, response) => {
  const {playerId} = request.params
  const deletequery = `
  DELETE
  cricket_team
  WHERE 
player_id = ${playerId} `
  const deleted = await db.run(deletequery)
  response.send('Player Removed')
})
