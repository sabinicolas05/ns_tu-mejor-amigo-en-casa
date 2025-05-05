import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const crearUsuarioNS = async (req, res) => {
  const { nombre, email, password, mascota_id } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.usuarios.create({
      data: {
        nombre,
        email,
        password: hashedPassword,
        mascota_id,
      },
    });

    res.status(201).json({ message: "El usuario fue registrado correctamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo registrar el usuario." });
  }
};

const listarUsuariosNS = async (req, res) => {
  try {
    const usuarios = await prisma.usuarios.findMany({
      include: { mascotas: true },
    });
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudieron listar los usuarios." });
  }
};

const obtenerUsuarioPorIdNS = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID no válido." });

  try {
    const usuario = await prisma.usuarios.findUnique({
      where: { id },
      include: { mascotas: true },
    });

    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado." });

    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el usuario." });
  }
};

const actualizarUsuarioNS = async (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, email, password, mascota_id } = req.body;
  if (isNaN(id)) return res.status(400).json({ error: "ID no válido." });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.usuarios.update({
      where: { id },
      data: {
        nombre,
        email,
        password: hashedPassword,
        mascota_id,
      },
    });

    res.json({ message: "El usuario fue actualizado correctamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo actualizar el usuario." });
  }
};

const patchUsuarioNS = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID no válido." });

  const { nombre, email, password, mascota_id } = req.body;
  const data = {};
  if (nombre !== undefined) data.nombre = nombre;
  if (email !== undefined) data.email = email;
  if (mascota_id !== undefined) data.mascota_id = mascota_id;
  if (password !== undefined) data.password = await bcrypt.hash(password, 10);

  try {
    await prisma.usuarios.update({
      where: { id },
      data,
    });

    res.json({ message: "El usuario fue actualizado parcialmente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al hacer actualización parcial del usuario." });
  }
};

const eliminarUsuarioNS = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID no válido." });

  try {
    await prisma.usuarios.delete({
      where: { id },
    });
    res.json({ message: "El usuario fue eliminado correctamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo eliminar el usuario." });
  }
};

export {crearUsuarioNS,listarUsuariosNS,obtenerUsuarioPorIdNS,actualizarUsuarioNS,patchUsuarioNS,eliminarUsuarioNS,};
