import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const crearGeneroNS = async (req, res) => {
    const { nombre } = req.body;

    try {
        const genero = await prisma.generos.create({ data: { nombre } });
        res.status(201).json(genero);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'No se pudo crear el nuevo género.', error });
    }
};

const listarGenerosNS = async (req, res) => {
    try {
        const generos = await prisma.generos.findMany();
        res.json(generos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'No se pudieron recuperar los géneros.', error });
    }
};

const obtenerGeneroPorIdNS = async (req, res) => {
    const { id } = req.params;
    const generoId = parseInt(id);

    if (isNaN(generoId)) {
        return res.status(400).json({ mensaje: 'El ID proporcionado no es válido.' });
    }

    try {
        const genero = await prisma.generos.findUnique({
            where: { id: generoId },
            include: { mascotas: true }
        });

        if (!genero) {
            return res.status(404).json({ mensaje: 'No se encontró ningún género con ese ID.' });
        }

        res.json(genero);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al buscar el género en la base de datos.', error });
    }
};

const actualizarGeneroNS = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    const generoId = parseInt(id);

    try {
        const genero = await prisma.generos.update({
            where: { id: generoId },
            data: { nombre }
        });

        res.json(genero);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'No fue posible actualizar el género.', error });
    }
};

const patchGeneroNS = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    const generoId = parseInt(id);

    const datosActualizados = {};
    if (nombre !== undefined) datosActualizados.nombre = nombre;

    try {
        const genero = await prisma.generos.update({
            where: { id: generoId },
            data: datosActualizados
        });

        res.json(genero);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'No se pudo realizar la actualización parcial del género.', error });
    }
};

const eliminarGeneroNS = async (req, res) => {
    const { id } = req.params;
    const generoId = parseInt(id);

    try {
        await prisma.generos.delete({ where: { id: generoId } });
        res.json({ mensaje: 'El género fue eliminado exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'No se pudo eliminar el género especificado.', error });
    }
};

export {crearGeneroNS,listarGenerosNS,obtenerGeneroPorIdNS,actualizarGeneroNS,patchGeneroNS,eliminarGeneroNS};
