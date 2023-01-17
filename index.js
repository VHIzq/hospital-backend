const express = require('express');

require('dotenv').config();

const cors = require('cors');

const { dbConnection } = require('./database/config');

//*create db server
const app = express();

//*setting cors
app.use(cors());

//*db connection
dbConnection();

//*routing
app.get('/', (req, res) => {
  res.json({
    ok: true,
    msg: 'Hello Jupiter',
  });
});

app.listen(process.env.PORT, () => {
  console.log('Server running on port' + 3000);
});
