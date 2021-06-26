import { Request, Response } from "express";
import { ListerUserSendComplimentsService } from "../services/ListUserSendComplimentsService";

class ListerUserReceiveComplimentsController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;

    const listUserSend = new ListerUserSendComplimentsService();

    const compliments = await listUserSend.execute(user_id);

    return response.json(compliments);
  }
}

export { ListerUserReceiveComplimentsController };
