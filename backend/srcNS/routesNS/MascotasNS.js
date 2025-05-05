import express from "express";
import { verificarToken } from "../middlewaresNS/NSAuthMiddleware.js";
import { crearMascotaNS,listarMascotasNS,obtenerMascotaPorIdNS,actualizarMascotaNS,patchMascotaNS,eliminarMascotaNS,} from "../controllersNS/ControllerMascotasNS.js";

const routerMascotaNS = express.Router();

routerMascotaNS.post("/mascota",verificarToken, crearMascotaNS);
routerMascotaNS.get("/mascota", verificarToken, listarMascotasNS);
routerMascotaNS.get("/mascota/:id",verificarToken, obtenerMascotaPorIdNS);
routerMascotaNS.put("/mascota/:id", verificarToken, actualizarMascotaNS);
routerMascotaNS.patch("/mascota/:id",verificarToken, patchMascotaNS);
routerMascotaNS.delete("/mascota/:id",verificarToken, eliminarMascotaNS);

export default routerMascotaNS;



