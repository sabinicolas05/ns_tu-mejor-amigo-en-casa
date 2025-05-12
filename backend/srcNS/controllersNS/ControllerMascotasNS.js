import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Crear mascota
const crearMascotaNS = async (req, res) => {
  try {
    const { nombre, estado, raza_id, categoria_id, genero_id, usuario_id } = req.body;
    const foto = req.file?.filename || "sin_foto.jpg";

    const nuevaMascota = await prisma.mascotas.create({
      data: {
        nombre,
        estado,
        foto,
        raza_id: parseInt(raza_id),
        categoria_id: parseInt(categoria_id),
        genero_id: parseInt(genero_id),
        usuario_id: parseInt(usuario_id),
      },
    });

    res.status(201).json({ message: "Mascota registrada correctamente.", mascota: nuevaMascota });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo registrar la mascota." });
  }
};

// Listar todas las mascotas
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

// Obtener mascota por ID
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

// Actualizar mascota
const actualizarMascotaNS = async (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, estado, raza_id, categoria_id, genero_id, usuario_id } = req.body;
  const foto = req.file?.filename;

  try {
    const data = {
      nombre,
      estado,
      raza_id: parseInt(raza_id),
      categoria_id: parseInt(categoria_id),
      genero_id: parseInt(genero_id),
      usuario_id: parseInt(usuario_id),
    };

    if (foto) data.foto = foto;

    const mascotaActualizada = await prisma.mascotas.update({
      where: { id },
      data,
    });

    res.json({ message: "Mascota actualizada correctamente.", mascota: mascotaActualizada });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo actualizar la mascota." });
  }
};

// Actualización parcial
const patchMascotaNS = async (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, estado, raza_id, categoria_id, genero_id, usuario_id } = req.body;
  const foto = req.file?.filename;

  const data = {};
  if (nombre !== undefined) data.nombre = nombre;
  if (estado !== undefined) data.estado = estado;
  if (raza_id !== undefined) data.raza_id = parseInt(raza_id);
  if (categoria_id !== undefined) data.categoria_id = parseInt(categoria_id);
  if (genero_id !== undefined) data.genero_id = parseInt(genero_id);
  if (usuario_id !== undefined) data.usuario_id = parseInt(usuario_id);
  if (foto) data.foto = foto;

  try {
    const mascota = await prisma.mascotas.update({
      where: { id },
      data,
    });

    res.json({ message: "Mascota actualizada parcialmente.", mascota });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo actualizar parcialmente la mascota." });
  }
};

// Eliminar mascota
const eliminarMascotaNS = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.mascotas.delete({
      where: { id },
    });
    res.json({ message: "Mascota eliminada correctamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo eliminar la mascota." });
  }
};

export {
  crearMascotaNS,
  listarMascotasNS,
  obtenerMascotaPorIdNS,
  actualizarMascotaNS,
  patchMascotaNS,
  eliminarMascotaNS,
};
