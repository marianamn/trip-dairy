import Navigo from "navigo";
import { diariesController } from "diariesController";

const router = new Navigo(null, true);

router
    .on("home", diariesController.home)
    .on(() => {
        router.navigate("/home");
    })
    .resolve();