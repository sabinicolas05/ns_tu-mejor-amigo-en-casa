import express from "express";
import { verificarTokenNS } from "../controllersNS/authcontrollerNS.js";
import { crearMascotaNS,listarMascotasNS,obtenerMascotaPorIdNS,actualizarMascotaNS,patchMascotaNS,eliminarMascotaNS,} from "../controllersNS/ControllerMascotasNS.js";
import { upload } from "../configNS/multer.js";

const routerMascotaNS = express.Router();

routerMascotaNS.post("/mascota",upload.single("photo"),verificarTokenNS, crearMascotaNS);
routerMascotaNS.get("/mascota", verificarTokenNS, listarMascotasNS);
routerMascotaNS.get("/mascota/:id",verificarTokenNS, obtenerMascotaPorIdNS);
routerMascotaNS.put("/mascota/:id", upload.single("photo"), verificarTokenNS, actualizarMascotaNS);
routerMascotaNS.patch("/mascota/:id",verificarTokenNS, patchMascotaNS);
routerMascotaNS.delete("/mascota/:id",verificarTokenNS, eliminarMascotaNS);

export default routerMascotaNS;



