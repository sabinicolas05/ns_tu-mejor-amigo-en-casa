import express from "express";
import { verificarTokenNS } from "../controllersNS/authcontrollerNS.js";
import { crearGeneroNS,listarGenerosNS,obtenerGeneroPorIdNS,actualizarGeneroNS,patchGeneroNS,eliminarGeneroNS,} from "../controllersNS/ControllerGeneroNS.js";

const routerGeneroNS = express.Router();

routerGeneroNS.post("/genero",verificarTokenNS, crearGeneroNS);
routerGeneroNS.get("/genero", verificarTokenNS, listarGenerosNS);
routerGeneroNS.get("/genero/:id",verificarTokenNS, obtenerGeneroPorIdNS);
routerGeneroNS.put("/genero/:id",verificarTokenNS, actualizarGeneroNS);
routerGeneroNS.patch("/genero/:id",verificarTokenNS, patchGeneroNS);
routerGeneroNS.delete("/genero/:id",verificarTokenNS, eliminarGeneroNS);

export default routerGeneroNS;
