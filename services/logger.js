import path from 'path';
import winston from 'winston';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const colors = {
  error: 'underline red',
  warn: 'yellow',
  info: 'cyan',
  debug: 'green',
};

winston.addColors(colors);

const { createLogger, format, transports } = winston;

const logger = createLogger({
  levels,
  level: 'debug',
  // Don't exit after logging an uncaughtException.
  exitOnError: false,
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
    format.ms(),
  ),
  transports: [
    // Write error logs to `/logs/error.log`.
    new transports.File({
      filename: `${path.resolve()}/logs/error.log`, level: 'error',
    }),
    // Write all logs to `/logs/combined.log`.
    new transports.File({
      filename: `${path.resolve()}/logs/combined.log`,
      level: 'debug',
      // handleRejections: true,
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple(),
    ),
  }));
}

export default logger;
