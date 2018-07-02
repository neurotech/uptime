let config = {
  statusEndPoint:
    process.env.UPTIME_STATUS_ENDPOINT || "http://localhost:4567/status",
  port: 4567,
  defaults: {
    status: {}
  }
};

module.exports = config;
