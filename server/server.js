const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDb = require('./config/db');

dotenv.config();

connectDb();

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
  origin: [ "https://real-time-chat-app-c45p.vercel.app"],
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type"],
  credentials: true
}));

app.use('/api/v1/users', require('./routes/userRoute'));

app.use('/api/v1/transactions', require('./routes/transactionRoute'));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});