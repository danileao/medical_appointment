export class ParameterRequiredError extends Error {
  statusCode?: number

  constructor(message: string, statusCode?: number) {
    super(message)
    this.name = 'PARAMETER_REQUIRED_ERROR'
    this.statusCode = statusCode
  }
}
