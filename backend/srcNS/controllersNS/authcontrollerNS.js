import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Controlador de login
export const loginUserNS = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.usuarios.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ msg: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_SECRET || "nico", // Asegúrate de definir esto en tu `.env`
      { expiresIn: "8h" }
    );

    res.status(200).json({
      msg: "Inicio de sesión exitoso",
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

// Middleware para verificar token
export const verificarTokenNS = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Acceso denegado. Token no proporcionado." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "nico");
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error al verificar token:", error.message);
    return res.status(403).json({ msg: "Token inválido o expirado." });
  }
};
