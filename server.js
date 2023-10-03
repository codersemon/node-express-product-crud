// dependencies 
import express from 'express';
import 'dotenv/config';
import 'colors';
import shopRouter from './routes/product.js';
import expressEJSLayouts from 'express-ejs-layouts';

// express init 
const app = express();

// middlewares 
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// ejs render engine 
app.set('view engine', 'ejs');
app.use(expressEJSLayouts);

// route middlewares 
app.use(shopRouter);



// server port 
const PORT = process.env.PORT || 6060;

// server listen 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.bgBlue.black);
})