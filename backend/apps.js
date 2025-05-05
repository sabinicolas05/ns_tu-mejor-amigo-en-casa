import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import YAML from "yamljs";

import routerUsuarioNS from "./srcNS/routesNS/UsuariosNS.js";
import routerRazaNS from "./srcNS/routesNS/RazasNS.js";
import routerCategoriaNS from "./srcNS/routesNS/CategoriaNS.js";
import routerGeneroNS from "./srcNS/routesNS/GeneroNS.js";
import routerMascotaNS from "./srcNS/routesNS/MascotasNS.js";
import authRouterNS from "./srcNS/routesNS/authRouterNS.js";


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouterNS)
app.use(routerUsuarioNS);
app.use(routerRazaNS);
app.use(routerCategoriaNS);
app.use(routerGeneroNS);
app.use(routerMascotaNS);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  //console.log(`Documentación disponible en http://localhost:${PORT}/document`);
});
