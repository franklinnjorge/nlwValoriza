import { request, response, Router } from "express";
import { CreateUserController } from "../src/controllers/CreateUsersControllers";
import { CreateTagController } from "../src/controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ListerUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController";
import { ListerUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListCustomerController } from "./controllers/ListCustomersController";

const router = Router();

const createUsersController = new CreateUserController();
const createTagsController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserReceiveComplimentsController =
  new ListerUserReceiveComplimentsController();
const listerUserSendComplimentsController =
  new ListerUserSendComplimentsController();
const listTagsController = new ListTagsController();
const listCustomerController = new ListCustomerController();


router.post("/users", ensureAuthenticated, createUsersController.handle);
router.get("/users", ensureAuthenticated, listCustomerController.handle)

router.post(
  "/tags",
  ensureAuthenticated,
  ensureAdmin,
  createTagsController.handle
);

router.get("/tags", ensureAuthenticated, listTagsController.handle);

router.post("/login", authenticateUserController.handle);

router.post(
  "/compliments",
  ensureAuthenticated,
  createComplimentController.handle
);

router.get(
  "/users/compliments/send",
  ensureAuthenticated,
  listUserReceiveComplimentsController.handle
);

router.get(
  "/users/compliments/receive",
  ensureAuthenticated,
  listerUserSendComplimentsController.handle
);

export { router };
