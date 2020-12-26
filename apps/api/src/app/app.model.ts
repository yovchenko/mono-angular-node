import * as mongoose from 'mongoose';

const mongoUri = process.env.CONNECTION_STRING;

export function connect() {
    mongoose.set('debug', true);
    return mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true});
}

// Get the default connection
 const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
 db.on('error', console.error.bind(console, 'MongoDB connection error:'));
