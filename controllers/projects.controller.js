const pool = require("../db");

const createProject = async (req, res) => {

  try {
    const { 
      nombre,
      descripcion,
      fecha_inicio,
      fecha_fin,
      usuario_id 
    } = req.body;

    const { rows } = await pool.query(
      "INSERT INTO proyectos (nombre, descripcion, fecha_inicio, fecha_finalizacion, usuario_id) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      [
        nombre,
        descripcion,
        fecha_inicio,
        fecha_fin,
        usuario_id
      ]
    );

    res.status(201).json({
      ok: true,
      message: 'Project created!',
      id: rows[0].id
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const getProjects = async(req, res ) => {

  try {
    
    const { id } = req.query

    let query = 'SELECT * FROM proyectos'

    if (id) {

      query+= ' WHERE id = $1 ';
      
      const { rows } = await pool.query(
        query,
        [ id ]
      );

      if ( rows.length ) {
        return res.status(200).json({
          ok: true,
          project: rows[0]
        });
      } else {
        return res.status(404).json({ ok: false, message: `Project with id, ${id} not found!` });
      }
    } else {
      const { rows } = await pool.query(
        query
      );
      return res.status(200).json({
        ok: true,
        projects: rows
      });
    }
    
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const updateProject = async (req, res) => {

  try {
    const {
      id,
      nombre,
      descripcion,
      fecha_inicio,
      fecha_fin,
      usuario_id 
    } = req.body;

    const { rows } = await pool.query(
      "UPDATE proyectos SET nombre = $1, descripcion = $2, fecha_inicio = $3, fecha_finalizacion = $4, usuario_id = $5 WHERE id = $6 RETURNING *",
      [
        nombre,
        descripcion,
        fecha_inicio,
        fecha_fin,
        usuario_id,
        id
      ]
    );

    if ( !rows.length ) {
      return res.status(404).json({
          ok: false,
          message: `Project with id ${id} not found!`
      })
    }

    res.status(201).json({
      ok: true,
      message: 'Project updated!',
      id: rows[0].id
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const deleteProject = async (req, res) => {

  try {

    const { 
      id
    } = req.body;

    await pool.query(
      "DELETE FROM proyectos WHERE id = $1",
      [
        id
      ]
    );

    res.status(204).json({
      ok: true,
      message: 'Project deleted!',
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
    createProject,
    getProjects,
    updateProject,
    deleteProject
}