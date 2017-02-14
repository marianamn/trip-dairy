import Navigo from "navigo";
import { diariesController } from "diariesController";
import { usersController } from "usersController";

const router = new Navigo(null, true);

router
    .on("home", diariesController.home)
    .on("register", usersController.register)
    .on("login", usersController.login)
    .on(() => {
        router.navigate("/home");
    })
    .resolve();