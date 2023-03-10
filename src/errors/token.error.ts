export class TokenError extends Error {
  statusCode?: number

  constructor(message: string, statusCode?: number) {
    super(message)
    this.name = 'TOKEN_ERROR'
    this.statusCode = statusCode
  }
}
