import { Router } from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";
import { ContactController } from "../controller/contact-controller";
import { AddressController } from "../controller/address-controller";
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
apiRouter.delete("/api/v1/contacts/:contactId", ContactController.delete);
apiRouter.get("/api/v1/contacts", ContactController.search);

// address
apiRouter.post("/api/v1/contacts/:contactId/addresses", AddressController.create);
apiRouter.get("/api/v1/contacts/:contactId/addresses/:addressId", AddressController.get);
apiRouter.put("/api/v1/contacts/:contactId/addresses/:addressId", AddressController.update);
apiRouter.delete("/api/v1/contacts/:contactId/addresses/:addressId", AddressController.delete);
apiRouter.get("/api/v1/contacts/:contactId/addresses/", AddressController.list);
