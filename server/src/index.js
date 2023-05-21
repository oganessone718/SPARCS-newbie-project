const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const port = process.env.EXPRESS_PORT;

const statusRouter = require('./routes/status');
const mjRouter = require('./routes/mj');
const accountRouter = require('./routes/account');


app.use(express.json());

const whitelist = ['http://localhost:3000'];
const corsOptions = {
    origin: (origin, callback) => {
        console.log('[REQUEST-CORS] Request from origin: ', origin);
        if (!origin || whitelist.indexOf(origin) !== -1) callback(null, true)
        else callback(new Error('Not Allowed by CORS'));
    },
    credentials: true,
}
/* DO NOT REMOVE */
/* Configure Environment Variables */
if (process.env.ENVIRONMENT === "DEVELOPMENT") {
	dotenv.config({ path: ".env.development" })
} else {
	dotenv.config({ path: ".env.production" })
}

app.use('/status', statusRouter);
app.use('/mj', mjRouter);
app.use('/account', accountRouter);

app.use('/static', express.static(path.join(__dirname,'public')));

app.use(cors(corsOptions));

app.get("/", (req, res) => {
	res.send("Hello, World!");
});

// Connect to MongoDB
const OMongooseOption = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(process.env.MONGO_URI, OMongooseOption).then(
    () => { console.log("[Mongoose] Connection Complete!") },
    (err) => { console.log(`[Mongoose] Connection Error: ${ err }`) }
);

app.listen(port, () => {
	console.log(`Express Listening @ http://localhost:${ port }`);
});
