import express from "express";
import { verificarToken } from "../middlewaresNS/NSAuthMiddleware.js";
import {crearCategoriaNS,listarCategoriasNS,obtenerCategoriaPorIdNS,actualizarCategoriaNS,patchCategoriaNS,eliminarCategoriaNS,} from "../controllersNS/ControllerCategoriasNS.js";

const routerCategoriaNS = express.Router();

routerCategoriaNS.post("/categoria",verificarToken, crearCategoriaNS);
routerCategoriaNS.get("/categoria", verificarToken,listarCategoriasNS);
routerCategoriaNS.get("/categoria/:id", verificarToken, obtenerCategoriaPorIdNS);
routerCategoriaNS.put("/categoria/:id", verificarToken, actualizarCategoriaNS);
routerCategoriaNS.patch("/categoria/:id", verificarToken, patchCategoriaNS);
routerCategoriaNS.delete("/categoria/:id", verificarToken, eliminarCategoriaNS);

export default routerCategoriaNS;
