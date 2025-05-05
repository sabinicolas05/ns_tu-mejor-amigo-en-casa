import express from "express";
import { verificarToken } from "../middlewaresNS/NSAuthMiddleware.js";
import { crearUsuarioNS, listarUsuariosNS, obtenerUsuarioPorIdNS, actualizarUsuarioNS, patchUsuarioNS, eliminarUsuarioNS } from "../controllersNS/ControllerUsuariosNS.js";

const routerUsuarioNS = express.Router();

routerUsuarioNS.post("/usuario",verificarToken, crearUsuarioNS);
routerUsuarioNS.get("/usuario", verificarToken, listarUsuariosNS);
routerUsuarioNS.get("/usuario/:id", verificarToken, obtenerUsuarioPorIdNS);
routerUsuarioNS.put("/usuario/:id", verificarToken, actualizarUsuarioNS);
routerUsuarioNS.patch("/usuario/:id", verificarToken, patchUsuarioNS);
routerUsuarioNS.delete("/usuario/:id",verificarToken, eliminarUsuarioNS);

export default routerUsuarioNS;
