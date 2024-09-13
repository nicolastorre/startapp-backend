import * as path from 'path';
import * as winston from 'winston';

const logPath = path.join(__dirname, '..', '..', 'logs');

export const winstonConfig = {
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
      filename: path.join(logPath, 'error.log'),
    }),
  ],
};
