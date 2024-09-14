import * as path from 'path';
import * as winston from 'winston';

const logPath = path.join(__dirname, '..', 'logs');

const customFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

export const winstonConfig = {
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    customFormat,
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
    new winston.transports.File({
      filename: path.join(logPath, 'error.log'),
      level: 'error',
    }),
    new winston.transports.File({
      filename: path.join(logPath, 'all.log'),
      level: 'info',
    }),
  ],
};
