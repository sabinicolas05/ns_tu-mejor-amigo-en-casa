import express from "express";
import { verificarToken } from "../middlewaresNS/NSAuthMiddleware.js";
import { crearGeneroNS,listarGenerosNS,obtenerGeneroPorIdNS,actualizarGeneroNS,patchGeneroNS,eliminarGeneroNS,} from "../controllersNS/ControllerGeneroNS.js";

const routerGeneroNS = express.Router();

routerGeneroNS.post("/genero",verificarToken, crearGeneroNS);
routerGeneroNS.get("/genero", verificarToken, listarGenerosNS);
routerGeneroNS.get("/genero/:id",verificarToken, obtenerGeneroPorIdNS);
routerGeneroNS.put("/genero/:id",verificarToken, actualizarGeneroNS);
routerGeneroNS.patch("/genero/:id",verificarToken, patchGeneroNS);
routerGeneroNS.delete("/genero/:id",verificarToken, eliminarGeneroNS);

export default routerGeneroNS;
