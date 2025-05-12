import express from "express";
import { verificarTokenNS } from "../controllersNS/authcontrollerNS.js";
import {crearRazaNS,listarRazasNS,obtenerRazaPorIdNS,actualizarRazaNS,patchRazaNS,eliminarRazaNS,} from "../controllersNS/ControllerRazasNS.js"; 

const routerRazaNS = express.Router();

routerRazaNS.post("/raza",verificarTokenNS, crearRazaNS);
routerRazaNS.get("/raza", verificarTokenNS, listarRazasNS);
routerRazaNS.get("/raza/:id",verificarTokenNS, obtenerRazaPorIdNS);
routerRazaNS.put("/raza/:id", verificarTokenNS,actualizarRazaNS);
routerRazaNS.patch("/raza/:id", verificarTokenNS, patchRazaNS);
routerRazaNS.delete("/raza/:id", verificarTokenNS, eliminarRazaNS);

export default routerRazaNS;
