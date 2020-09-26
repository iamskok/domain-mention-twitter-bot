import path from 'path';
import winston from 'winston';
import customTimestamp from '../utils/timestamp.js';
import { LEVELS, COLORS } from '../constants/logger.js';

winston.addColors(COLORS);

const { createLogger, format, transports } = winston;

const customFormat = format.combine(
  format.colorize({ all: true }),
  format.timestamp({
    format: customTimestamp,
  }),
  format.splat(),
  format.errors(),
  format.printf(
    ({
      timestamp,
      level,
      message,
      ...rest
    }) => {
      let restString = JSON.stringify(rest, undefined, 2);
      restString = restString === '{}' ? '' : restString;
      return `[${timestamp}] ${level} - ${message} ${restString}`;
    },
  ),
);

const logger = createLogger({
  levels: LEVELS,
  level: 'debug',
  // Don't exit after logging an `uncaughtException`.
  exitOnError: false,
  format: customFormat,
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
    // Write all logs to `/logs/debug.log`.
    new transports.File({
      filename: `${path.resolve()}/logs/debug.log`,
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
    format: customFormat,
  }));
}

export default logger;
