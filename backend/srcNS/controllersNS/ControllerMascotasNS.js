import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const crearMascotaNS = async (req, res) => {
  const { foto, nombre, estado, raza_id, categoria_id, genero_id } = req.body;

  try {
    const nuevaMascota = await prisma.mascotas.create({
      data: { foto, nombre, estado, raza_id, categoria_id, genero_id },
    });
    res.status(201).json({ message: "La mascota fue registrada correctamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo registrar la mascota." });
  }
};

const listarMascotasNS = async (req, res) => {
  try {
    const mascotas = await prisma.mascotas.findMany({
      include: {
        razas: true,
        categorias: true,
        generos: true,
        usuarios: true,
      },
    });
    res.json(mascotas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudieron listar las mascotas." });
  }
};

const obtenerMascotaPorIdNS = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID no válido." });

  try {
    const mascota = await prisma.mascotas.findUnique({
      where: { id },
      include: {
        razas: true,
        categorias: true,
        generos: true,
        usuarios: true,
      },
    });

    if (!mascota) return res.status(404).json({ error: "Mascota no encontrada." });

    res.json(mascota);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la mascota." });
  }
};

const actualizarMascotaNS = async (req, res) => {
  const id = parseInt(req.params.id);
  const { foto, nombre, estado, raza_id, categoria_id, genero_id } = req.body;

  try {
    const mascotaActualizada = await prisma.mascotas.update({
      where: { id },
      data: { foto, nombre, estado, raza_id, categoria_id, genero_id },
    });
    res.json({ message: "La mascota fue actualizada correctamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo actualizar la mascota." });
  }
};

const patchMascotaNS = async (req, res) => {
  const id = parseInt(req.params.id);
  const { foto, nombre, estado, raza_id, categoria_id, genero_id } = req.body;

  const data = {};
  if (foto !== undefined) data.foto = foto;
  if (nombre !== undefined) data.nombre = nombre;
  if (estado !== undefined) data.estado = estado;
  if (raza_id !== undefined) data.raza_id = raza_id;
  if (categoria_id !== undefined) data.categoria_id = categoria_id;
  if (genero_id !== undefined) data.genero_id = genero_id;

  try {
    const mascotaActualizada = await prisma.mascotas.update({
      where: { id },
      data,
    });
    res.json({ message: "La mascota fue actualizada parcialmente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al hacer actualización parcial de la mascota." });
  }
};

const eliminarMascotaNS = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.mascotas.delete({
      where: { id },
    });
    res.json({ message: "La mascota fue eliminada correctamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo eliminar la mascota." });
  }
};

export {crearMascotaNS,listarMascotasNS,obtenerMascotaPorIdNS,actualizarMascotaNS,patchMascotaNS,eliminarMascotaNS,};
