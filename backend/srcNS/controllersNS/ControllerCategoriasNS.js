import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const crearCategoriaNS = async (req, res) => {
    const { nombre } = req.body;

    try {
        const categoria = await prisma.categorias.create({
            data: { nombre }
        });
        res.status(201).json(categoria);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'No se pudo crear la nueva categoría.', error });
    }
};

const listarCategoriasNS = async (req, res) => {
    try {
        const categorias = await prisma.categorias.findMany();
        res.json(categorias);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'No se pudieron recuperar las categorías.', error });
    }
};

const obtenerCategoriaPorIdNS = async (req, res) => {
    const { id } = req.params;
    const categoriaId = parseInt(id);

    if (isNaN(categoriaId)) {
        return res.status(400).json({ mensaje: 'El ID proporcionado no es válido.' });
    }

    try {
        const categoria = await prisma.categorias.findUnique({
            where: { id: categoriaId },
            include: { mascotas: true }
        });

        if (!categoria) {
            return res.status(404).json({ mensaje: 'No se encontró ninguna categoría con ese ID.' });
        }

        res.json(categoria);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al buscar la categoría en la base de datos.', error });
    }
};

const actualizarCategoriaNS = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    const categoriaId = parseInt(id);

    try {
        const categoria = await prisma.categorias.update({
            where: { id: categoriaId },
            data: { nombre }
        });

        res.json(categoria);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'No fue posible actualizar la categoría.', error });
    }
};

const patchCategoriaNS = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    const categoriaId = parseInt(id);

    const datosActualizados = {};
    if (nombre !== undefined) datosActualizados.nombre = nombre;

    try {
        const categoria = await prisma.categorias.update({
            where: { id: categoriaId },
            data: datosActualizados
        });

        res.json(categoria);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'No se pudo realizar la actualización parcial de la categoría.', error });
    }
};

const eliminarCategoriaNS = async (req, res) => {
    const { id } = req.params;
    const categoriaId = parseInt(id);

    try {
        await prisma.categorias.delete({ where: { id: categoriaId } });
        res.json({ mensaje: 'La categoría fue eliminada exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'No se pudo eliminar la categoría especificada.', error });
    }
};

export {crearCategoriaNS,listarCategoriasNS,obtenerCategoriaPorIdNS,actualizarCategoriaNS,patchCategoriaNS,
eliminarCategoriaNS
};
