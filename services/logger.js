import path from 'path';
import winston from 'winston';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
};

const colors = {
  error: 'underline red',
  warn: 'yellow',
  info: 'cyan',
  verbose: 'green',
  debug: 'white',
};

winston.addColors(colors);

const { createLogger, format, transports } = winston;

const logger = createLogger({
  levels,
  level: 'debug',
  // Don't exit after logging an `uncaughtException`.
  exitOnError: false,
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  transports: [
    // Write error logs to `/logs/error.log`.
    new transports.File({
      filename: `${path.resolve()}/logs/error.log`,
      level: 'error',
    }),
    // Write error, warning and info logs to `/logs/info.log`.
    new transports.File({
      filename: `${path.resolve()}/logs/info.log`,
      level: 'info',
    }),
    // Write all error, warning, info and verbose logs to `/logs/verbose.log`.
    new transports.File({
      filename: `${path.resolve()}/logs/verbose.log`,
      level: 'verbose',
    }),
    // Write all logs to `/logs/combined.log`.
    new transports.File({
      filename: `${path.resolve()}/logs/combined.log`,
      level: 'debug',
    }),
  ],
  exceptionHandlers: [
    new transports.File({
      filename: `${path.resolve()}/logs/exceptions.log`,
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    level: 'verbose',
    format: format.combine(
      format.colorize(),
      format.simple(),
    ),
  }));
}

export default logger;
