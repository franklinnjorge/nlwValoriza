import { Request, Response } from "express";
import { ListerUserReceiveComplimentsService } from "../services/ListUserReceiveComplimentsService";

class ListerUserSendComplimentsController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;

    const listUserReceive = new ListerUserReceiveComplimentsService();

    const compliments = await listUserReceive.execute(user_id);

    return response.json(compliments);
  }
}

export { ListerUserSendComplimentsController };
