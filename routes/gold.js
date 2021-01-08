var express = require('express');
var cookieParser = require('cookie-parser');
const Database = require('better-sqlite3');
var db = new Database('./database/goldgame.db', { verbose: console.log });

db.exec(`
CREATE TABLE IF NOT EXISTS games (
  hostname TEXT,
  gamename TEXT,
  password TEXT,
  players TINYINT,
  maxplayers TINYINT,
  code SMALLINT)
`);

process.on('exit', () => db.close());
process.on('SIGHUP', () => process.exit(128 + 1));
process.on('SIGINT', () => process.exit(128 + 2));
process.on('SIGTERM', () => process.exit(128 + 15));

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('gold/gold', { title: 'Gold the game' });
});


/* Lobbies */

router.get('/lobbies', function(req, res) {

  var lobbies = []
  const stmt = db.prepare('SELECT * FROM games');
  for (const lobby of stmt.iterate()) {
    var singlelobby = {
      hostname  : lobby.hostname,
      gamename  : lobby.gamename,
      players   : lobby.players,
      maxplayers: lobby.maxplayers,
      code      : lobby.code
    }
    lobbies.push(singlelobby)
  }

  res.render('gold/lobbies', {data: lobbies, title: "Lobbies"});
});

router.get('/play', function(req, res){
  console.log(req.query.code)
  var qcode = req.query.code

  res.render('gold/play');
})

/**
 * Create Game Logic
 */

router.route('/creategame') 
.get(function(req, res) {
  res.render('gold/creategame', { title: "temp" });
})
.post(function(req, res) {
  var user_name = req.body.cname;
  var game = req.body.gamename;
  var psw = req.body.psw;
  var mp = Number(req.body.players);
  var code = Math.floor(100000 + Math.random() * 900000)

  if (psw != null) {
    console.log(" No psw Open game")
    psw = "NONE"
  }

  console.log(user_name, game, psw, mp, code)

  const stmt = db.prepare('INSERT INTO games VALUES (?,?,?,?,?,?)')
  stmt.run(user_name, game, psw, 0, mp, code);

  res.cookie('uname', user_name)
  res.redirect(301, '/gold/play?code=' + code);
});

/**
 * End Game Logic
 */

router.post('/endgame', function(req, res) {

  res.redirect(301, '/')
});

module.exports = router;
