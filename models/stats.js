const db = require('./connection');

async function getTotalGamesPlayed(user_id) {
    const gamesPlayed = await db.query(`
        select count(*)
        from gameslog
        where user_id=$1;
    `, [user_id])
        .then(data => {
            // console.log(data);
            return data;
        })
        .catch (err => {
            console.log(err);
            return [];
        })
    return gamesPlayed;
}

async function getTotalCorrectAnswers(user_id) {
    // get all games played by user
    // get all stats for games played by that user
    const correctAnswerObject = await db.query(`
        select user_id, (sum(questionsCorrectJeopardy) + sum(questionsCorrectDoubleJeopardy) + sum(questionsCorrectFinalJeopardy)) as Total
        from stats, gameslog
        where gameslog.user_id=$1 and stats.game_id=gameslog.id
        group by user_id;
    `, [user_id])
        .then(data => {
            // console.log(data);
            return data;
        })
        .catch (err => {
            console.log(err);
            return [];
        })
    return correctAnswerObject;
}

module.exports = {
    getTotalGamesPlayed,
    getTotalCorrectAnswers
}