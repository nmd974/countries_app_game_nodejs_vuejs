const express = require('express');
const routes = require('./routes');
const path = require('path');
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
    next();
});
app.use('/api', routes);
//CombinedAPP
app.use(express.static(path.join('public/dist')));

app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'public/dist', 'index.html'));
});

const port = process.env.PORT || 3100; 
app.listen(port);  
console.log(`Server running on:${port}`)  