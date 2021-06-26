import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}
export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authtoken = request.headers.authorization;

  if (!authtoken) {
    return response.status(401).end();
  }

  const [, token] = authtoken.split(" ");

  try{
    const {sub} = verify(token, "b2e1c4b6064c2b7d3e97f125af89c80e") as IPayload;

    // recuperar a info do user! *dhr esse rolê, criei a pasta @types no src, e fui lá no arquivo  "typeRoots": ["./src/@types"], 
    request.user_id = sub; 
    
    return next();
  }catch(err){
    return response.status(401).end();
  }


}
