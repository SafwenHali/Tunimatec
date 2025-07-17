const express = require('express');

require('dotenv').config({ quiet: true });
const app = express();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.text({ type: 'application/xml' }));


app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

require('./app/scripts/jobs/jobs');
//require('./app/utils/monitor');

