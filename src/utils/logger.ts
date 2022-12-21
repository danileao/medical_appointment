import winston from 'winston'

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: 'DD/MM/YYYY HH:mm:ss' }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: 'src/logs/app.log',
    }),
    new winston.transports.File({
      filename: 'src/logs/error.log',
      level: 'error',
    }),
  ],
})

export { logger }
