import { NextFunction, Request, Response } from 'express'
import { CustomError } from '../../../../errors/custom.error'
import { JWTToken } from '../../token/jwt.token'

export const ensureAuthenticate = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  /**
   * 1 - Receber o meu token
   * 2 - Validar se token está correto
   * 3 - Se correto, passar para o próximo passo
   * 4 - Se não, retornar com erro
   */

  const headerAuth = request.headers.authorization

  if (!headerAuth) {
    return response.status(401).json({
      error: 'Token is missing',
    })
  }

  //  Beaerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoibWFyaWFuYSIsImlzQWRtaW4iOmZhbHNlLCJpZCI6IjNkMDE1MjUyLWQzMjEtNGM2Ni04OGE3LTI0NzRiYjg0ZDkyMSJ9LCJpYXQiOjE2NjcwNTg1MTEsImV4cCI6MTY2NzA1ODU3MSwic3ViIjoiM2QwMTUyNTItZDMyMS00YzY2LTg4YTctMjQ3NGJiODRkOTIxIn0.l_vC5SxJape41xs2etSPtf0TnW9SKOvA6PcdB-TcGK
  // [ 0 ] Bearer
  // [ 1 ] TOKEN

  const [, token] = headerAuth.split(' ')

  if (!token) {
    return response.status(401).json({
      error: 'Token is missing',
    })
  }

  const verifyToken = new JWTToken().validate(token)

  if (verifyToken) {
    request.userId = verifyToken.sub
    return next()
  }

  return response.status(401).json({
    error: 'Token invalid!',
  })
}
