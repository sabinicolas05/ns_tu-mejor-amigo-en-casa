import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const crearRazaNS = async (req, res) => {
  const { name } = req.body;

  try {
    const nuevaRaza = await prisma.razas.create({
      data: { name },
    });
    res.status(201).json({ message: "La raza fue registrada correctamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo registrar la raza." });
  }
};

const listarRazasNS = async (req, res) => {
  try {
    const razas = await prisma.razas.findMany({
      include: {
        mascotas: true,
      },
    });
    res.json(razas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudieron listar las razas." });
  }
};

const obtenerRazaPorIdNS = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID no válido." });

  try {
    const raza = await prisma.razas.findUnique({
      where: { id },
      include: {
        mascotas: true,
      },
    });

    if (!raza) return res.status(404).json({ error: "Raza no encontrada." });

    res.json(raza);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la raza." });
  }
};

const actualizarRazaNS = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  if (isNaN(id)) return res.status(400).json({ error: "ID no válido." });

  try {
    const razaActualizada = await prisma.razas.update({
      where: { id },
      data: { name },
    });
    res.json({ message: "La raza fue actualizada correctamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo actualizar la raza." });
  }
};

const patchRazaNS = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  if (isNaN(id)) return res.status(400).json({ error: "ID no válido." });

  const data = {};
  if (name !== undefined) data.name = name;

  try {
    const razaActualizada = await prisma.razas.update({
      where: { id },
      data,
    });
    res.json({ message: "La raza fue actualizada parcialmente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al hacer actualización parcial de la raza." });
  }
};

const eliminarRazaNS = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID no válido." });

  try {
    await prisma.razas.delete({
      where: { id },
    });
    res.json({ message: "La raza fue eliminada correctamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo eliminar la raza." });
  }
};

export {crearRazaNS,listarRazasNS,obtenerRazaPorIdNS,actualizarRazaNS,patchRazaNS,eliminarRazaNS,};
