const db = require("../db");

const status = {
  get: (request, response, tokens) => {
    let status = db.get("status").value();
    if (status.ip) {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.write(JSON.stringify(status));
      response.end();
    } else {
      response.writeHead(404, { "Content-Type": "application/json" });
      response.write(JSON.stringify({ status: "Not found!" }));
      response.end();
    }
  },
  post: (request, response, tokens) => {
    let status = [];
    request
      .on("data", chunk => {
        status.push(chunk);
      })
      .on("end", () => {
        status = Buffer.concat(status).toString();
        if (status.length > 0) {
          db.set("status", JSON.parse(status)).write();
          response.writeHead(200, { "Content-Type": "application/json" });
          response.write(JSON.stringify({ status: "OK" }));
          response.end();
        } else {
          response.writeHead(401, { "Content-Type": "application/json" });
          response.write(JSON.stringify({ status: "Not allowed!" }));
          response.end();
        }
      });
  }
};

module.exports = status;
