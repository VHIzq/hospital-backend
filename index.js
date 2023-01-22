
const express = require('express');

require('dotenv').config();

const cors = require('cors');

const { dbConnection } = require('./database/config');
const { json } = require('express');

//*create db server
const app = express();

//*setting cors
app.use(cors());

//* reading and parsing body
app.use( express.json());

//*db connection
dbConnection();

//*routing
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));



app.listen(process.env.PORT, () => {
  console.log('Server running on port' + process.env.PORT);
});
