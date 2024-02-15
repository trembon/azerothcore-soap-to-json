import express from 'express';
import { CallAzerothCore } from './azerothcore-api';
import fs from "fs";
import IConfig from './interfaces/config';

const app = express();

let config: IConfig;
try {
    let rawdata = fs.readFileSync("config.json");
    config = JSON.parse(rawdata.toString());
} catch (ex) {
    console.error("Failed to read configuration file", ex);
    process.exit();
}


app.get('/', (req, res) => {
    res.json([
        {
          url: "/status",
          method: "GET",
          info: "Get status of the server",
        },
    ]);
});

const rg_revision = new RegExp(/rev\. ([a-z0-9]*) \d{4}/, "gm");
const rg_connectedPlayers = new RegExp(/Connected players: ([0-9]*)\./, "gm");
app.get('/status', async (req, res) => {
    var response = await CallAzerothCore("server info", config);
    console.log("status response", response);

    const rev = rg_revision.exec(response.result);
    const players = rg_connectedPlayers.exec(response.result);

    res.json({
        "revision": rev[1],
        "connectedPlayers": parseInt(players[1])
    });
});

app.listen(config.server.port, () => {
  return console.log(`Express is listening on port: ${config.server.port}`);
});