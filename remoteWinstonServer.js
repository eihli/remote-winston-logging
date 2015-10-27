port = process.env.WINSTON_LISTEN_PORT || 9003
// Simple server for listening and writing logs to files
var winston = require('winston');
var express = require('express');
var winstonRemote = require('winston-remote').Server;

var winstonServer = winstonRemote.createServer({
  port: 9003
});

winstonServer.listen();

winstonServer.logger = new (winston.Logger)({
  transports: [
    new winston.transports.DailyRotateFile({
      filename: './logs/error.log',
      name: 'error-file',
      level: 'error'
    }),
    new winston.transports.DailyRotateFile({
      filename: './logs/info.log',
      name: 'info-file',
      level: 'info'
    })
  ]
});