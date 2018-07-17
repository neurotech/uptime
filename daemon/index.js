const spacetime = require("spacetime");
const publicIp = require("public-ip");
const tiny = require("tiny-json-http");
const config = require("../config");
const log = require("../log");

let timestampFormat = "dd MMMM yyyy hh:mm a";

log("info", "Starting status daemon.");
setInterval(() => {
  publicIp.v4().then(ip => {
    tiny.post(
      {
        url: config.statusEndPoint,
        data: {
          ip: ip,
          now: spacetime
            .now()
            .goto("Australia/Sydney")
            .format(timestampFormat)
        }
      },
      (err, res) => {
        if (err) {
          log("error", err);
        } else {
          log("success", "Successfully posted uptime.");
        }
      }
    );
  });
}, 1000 * 90);
