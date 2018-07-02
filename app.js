const http = require("http");
const SeaLion = require("sea-lion");
const config = require("./config");
const db = require("./db");
const status = require("./status");
const log = require("./log");

const seaLion = new SeaLion();

db.defaults(config.defaults).write();

seaLion.add({ "/status": { GET: status.get, POST: status.post } });

let port = config.port;
let server = http.createServer(seaLion.createHandler());
server.listen(port);
log("info", `Started web server on port ${port}.`);
