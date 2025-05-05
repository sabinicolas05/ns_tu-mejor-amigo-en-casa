import express from "express";
import { verificarToken } from "../middlewaresNS/NSAuthMiddleware.js";
import {crearRazaNS,listarRazasNS,obtenerRazaPorIdNS,actualizarRazaNS,patchRazaNS,eliminarRazaNS,} from "../controllersNS/ControllerRazasNS.js"; 

const routerRazaNS = express.Router();

routerRazaNS.post("/raza",verificarToken, crearRazaNS);
routerRazaNS.get("/raza", verificarToken, listarRazasNS);
routerRazaNS.get("/raza/:id",verificarToken, obtenerRazaPorIdNS);
routerRazaNS.put("/raza/:id", verificarToken,actualizarRazaNS);
routerRazaNS.patch("/raza/:id", verificarToken, patchRazaNS);
routerRazaNS.delete("/raza/:id", verificarToken, eliminarRazaNS);

export default routerRazaNS;
