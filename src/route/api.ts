import { Router } from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";
import { ContactController } from "../controller/contact-controller";
export const apiRouter = Router();

apiRouter.use(authMiddleware);

// users

apiRouter.get("/api/v1/users/current", UserController.get);
apiRouter.patch("/api/v1/users/current", UserController.update);
apiRouter.delete("/api/v1/users/logout", UserController.logout);

// contact

apiRouter.post("/api/v1/contacts", ContactController.create);
apiRouter.get("/api/v1/contacts/:contactId", ContactController.get);
apiRouter.put("/api/v1/contacts/:contactId", ContactController.update);
