import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verificarToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "xiomy");
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error al verificar el token:", error.message);
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
};
