import * as mongoose from 'mongoose';
import { injectable } from "inversify";
import "reflect-metadata";

const mongoUri = process.env.CONNECTION_STRING;

@injectable()
export default class MongoDb {
    async connect(): Promise<boolean> {
        try {
            await mongoose.connect(encodeURI(mongoUri), {
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            });
            return true;
        } catch (err) {
            throw new Error("Error connecting to the database: " + err);
        }
    }

    connection() {
        //Get the default connection
        return mongoose.connection;
    }
}


