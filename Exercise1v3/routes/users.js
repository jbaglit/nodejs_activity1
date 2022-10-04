const { Router } = require('express');
const db = require('../database');
const router = Router();

//test routing to this file
router.get('/', (req, res) => {
  res.status(200).send({
    msg: 'From routes/users.js...'
  });
});

//Filter and search???? any params??
router.get('/actors', async (req, res, next) => {
    const filters = req.query;

    const result = await db.promise().query(
        `SELECT actor_info.actor_id, actor_info.first_name, actor_info.last_name  
        FROM actor_info;`
        );
    const results = result[0];

    const filteredUsers = results.filter(user => {
      let isValid = true;
      for (key in filters) {
        isValid = isValid && user[key] == filters[key];
      }
      return isValid;
      
    });
    res.send(filteredUsers);
    
  });

  router.get('/films', async (req, res, next) => {
    const filters = req.query;
    const result = await db.promise().query(
        `SELECT film.film_id, film.title, film_list.category, actor_info.last_name
        FROM (((film_actor
        INNER JOIN film ON film_actor.film_id = film.film_id)
        INNER JOIN actor_info ON film_actor.actor_id = actor_info.actor_id)
        INNER JOIN film_list ON film.title = film_list.title);`
        );
        
    const results = result[0];

    const filteredUsers = results.filter(user => {
      let isValid = true;
      for (key in filters) {
        isValid = isValid && user[key] == filters[key];
      }
      return isValid;
    });
    res.send(filteredUsers);
  });

module.exports = router;