const express= require('express');
const app = express();
const cors = require('cors');
app.use(cors({
origin: "https://to-emgo14f03-harshs-projects-ecb21bf9.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

const todoRoutes= require('./routes/route');

app.use('/api', todoRoutes);

app.get('/api/test', (req, res) => {
    res.send('Hello World!');
});

app.get('/', (req, res) => {
  res.send('✅ Todo backend is running fine!');
});



module.exports= app;