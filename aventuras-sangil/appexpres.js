const express = require('express');
const app = express();
app.use((req, res, next) => {
console.log(`${new Date().toLocaleTimeString()} ${req.method} ${req.url}`);
next();
});
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
res.send('API Aventuras San Gil funcionando');
});


app.listen(PORT, () => {
console.log(`Servidor escuchando en http://localhost:${PORT}`);
});