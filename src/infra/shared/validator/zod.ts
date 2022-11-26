import { ZodError, ZodSchema } from 'zod'
import { ValidationSchemaError } from '../../../errors/validation-schema.error'

export type ErrorSchema = {
  field: (string | number)[]
  message: string
}

export const validatorSchema = (schema: ZodSchema, payload: any) => {
  try {
    schema.parse(payload)
  } catch (error) {
    const typedError = error as ZodError
    const errors: ErrorSchema[] = []

    typedError.errors.forEach((erro) => {
      errors.push({
        field: erro.path,
        message: erro.message,
      })
    })

    throw new ValidationSchemaError('ERROR_SCHEMA', errors)
  }
}
