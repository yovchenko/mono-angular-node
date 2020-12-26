/**
 * Required External Modules
 */
import * as express from 'express';
import dotenv from 'dotenv';
import * as cors from "cors";
import * as helmet from "helmet";
import { router } from "./app/app.controller";

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
  process.exit(1);
}

const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * Server Activation
 */

app.use("/api", router);

const port = process.env.PORT || 4200;

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
