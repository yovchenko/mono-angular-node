/**
 * Required External Modules
 */

import * as express from 'express';
import dotenv from 'dotenv';
import * as cors from "cors";
import * as helmet from "helmet";
import { router } from "./app/app.controller";
import * as path from "path";

const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", router);

if(process.env.NODE_ENV !== "test") {
  
/**
 * App Variables
 */

const root = "./";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

/**
 * Server Activation
 */

/*
app.use(express.static(path.join(__dirname, '..', 'mono-angular-node')));

app.get("*", (req, res) => {
  res.sendFile('dist/apps/mono-angular-node/index.html', {
    root
  });
});
*/

const port = process.env.PORT || 3333;

  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });

  server.on('error', console.error);
}

export default app;