import {Request, Response} from "express"
import { getCustomRepository } from "typeorm"
import { ListTagsService } from "../services/listTagsService"

class ListTagsController{
async handle(request: Request, response: Response){
  const listTagService = new ListTagsService()

  const tags = await listTagService.execute()

  return response.json(tags)
}

}

export {ListTagsController}