const router = require('express').Router();
const apiRoutes = require('./api')

// www.localhost:3001/api/users
router.use('/api', apiRoutes)

// localhost:3001/wassup
router.use((req, res) => res.send('Wrong route!'));

module.exports = router;
