 import {Request, Response} from "express"
import { ListCustomerService } from "../services/ListCustomerService"

class ListCustomerController {

    async handle(request: Request, response: Response){

      const listCustomerService = new ListCustomerService();

      const listCustomer = await listCustomerService.execute()

      return response.json(listCustomer)
    }

}

export {ListCustomerController}