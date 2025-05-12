import express from "express";
import swaggerUi from 'swagger-ui-express';
import dotenv from "dotenv";
import cors from "cors";
import YAML from "yamljs";

import routerUsuarioNS from "./srcNS/routesNS/UsuariosNS.js";
import routerRazaNS from "./srcNS/routesNS/RazasNS.js";
import routerCategoriaNS from "./srcNS/routesNS/CategoriaNS.js";
import routerGeneroNS from "./srcNS/routesNS/GeneroNS.js";
import routerMascotaNS from "./srcNS/routesNS/MascotasNS.js";
import { authRouterNS } from "./srcNS/routesNS/authRouterNS.js";


 

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Carpeta de imágenes

app.use('/imagenesNS', express.static('imagenesNS'));

app.use(authRouterNS)
app.use(routerUsuarioNS);
app.use(routerRazaNS);
app.use(routerCategoriaNS);
app.use(routerGeneroNS);
app.use(routerMascotaNS);


app.listen(3000, '0.0.0.0', () => {
    console.log(`Servidor iniciado en http://192.168.0.107:3000`);
    console.log(`Documentación en http://192.168.0.107:3000/docs`);
});
