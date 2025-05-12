import express from "express";
import { verificarTokenNS } from "../controllersNS/authcontrollerNS.js";
import { crearUsuarioNS, listarUsuariosNS, obtenerUsuarioPorIdNS, actualizarUsuarioNS, patchUsuarioNS, eliminarUsuarioNS } from "../controllersNS/ControllerUsuariosNS.js";

const routerUsuarioNS = express.Router();

routerUsuarioNS.post("/usuario", crearUsuarioNS);
routerUsuarioNS.get("/usuario", verificarTokenNS,listarUsuariosNS);
routerUsuarioNS.get("/usuario/:id", verificarTokenNS, obtenerUsuarioPorIdNS);
routerUsuarioNS.put("/usuario/:id", verificarTokenNS, actualizarUsuarioNS);
routerUsuarioNS.patch("/usuario/:id", verificarTokenNS, patchUsuarioNS);
routerUsuarioNS.delete("/usuario/:id",verificarTokenNS, eliminarUsuarioNS);

export default routerUsuarioNS;
