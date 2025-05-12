import express from "express";
import { verificarTokenNS } from "../controllersNS/authcontrollerNS.js";
import {crearCategoriaNS,listarCategoriasNS,obtenerCategoriaPorIdNS,actualizarCategoriaNS,patchCategoriaNS,eliminarCategoriaNS,} from "../controllersNS/ControllerCategoriasNS.js";

const routerCategoriaNS = express.Router();

routerCategoriaNS.post("/categoria",verificarTokenNS, crearCategoriaNS);
routerCategoriaNS.get("/categoria", verificarTokenNS,listarCategoriasNS);
routerCategoriaNS.get("/categoria/:id", verificarTokenNS, obtenerCategoriaPorIdNS);
routerCategoriaNS.put("/categoria/:id", verificarTokenNS, actualizarCategoriaNS);
routerCategoriaNS.patch("/categoria/:id", verificarTokenNS, patchCategoriaNS);
routerCategoriaNS.delete("/categoria/:id", verificarTokenNS, eliminarCategoriaNS);

export default routerCategoriaNS;
