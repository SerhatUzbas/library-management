import { Request, Response, NextFunction } from 'express'
import fs from 'fs'
import path from 'path'

const logDirectory = path.join(process.cwd(), 'logs')

if (!fs.existsSync(logDirectory)) {
	fs.mkdirSync(logDirectory, { recursive: true })
}

const getLogStream = () => {
	try {
		const date = new Date().toISOString().split('T')[0]
		const logPath = path.join(logDirectory, `api-${date}.log`)
		console.log('Attempting to write logs to:', logPath)
		return fs.createWriteStream(logPath, { flags: 'a' })
	} catch (error) {
		console.error('Error creating log stream:', error)
		throw error
	}
}

export const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
	try {
		const startTime = Date.now()
		const logStream = getLogStream()

		const logEntry = {
			timestamp: new Date().toISOString(),
			method: req.method,
			url: req.originalUrl,
			ip: req.ip,
			userAgent: req.get('user-agent'),
			body: req.body,
			query: req.query,
			params: req.params,
		}

		const originalSuccess = res.success
		const originalError = res.error

		res.success = function (message, data, statusCode = 200) {
			const endTime = Date.now()
			const responseTime = endTime - startTime

			logStream.write(
				JSON.stringify({
					...logEntry,
					responseTime: `${responseTime}ms`,
					statusCode,
					status: 'success',
					message,
					response: data,
				}) + '\n'
			)

			return originalSuccess.call(this, message, data, statusCode)
		}

		res.error = function (message, statusCode = 500) {
			const endTime = Date.now()
			const responseTime = endTime - startTime

			logStream.write(
				JSON.stringify({
					...logEntry,
					responseTime: `${responseTime}ms`,
					statusCode,
					status: 'error',
					message,
				}) + '\n'
			)

			return originalError.call(this, message, statusCode)
		}

		res.on('finish', () => {
			try {
				logStream.end()
			} catch (error) {
				console.error('Error closing log stream:', error)
			}
		})

		next()
	} catch (error) {
		console.error('Error in logging middleware:', error)
		next()
	}
}
