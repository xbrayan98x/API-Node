const pool = require("../db");

const createTask = async (req, res) => {

  try {

    const { 
      nombre,
      descripcion,
      estado,
      proyecto_id,
      asignado
    } = req.body;

    const { rows } = await pool.query(
      "INSERT INTO tareas (nombre, descripcion, estado, proyecto_id, asignada_a) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      [
        nombre,
        descripcion,
        estado,
        proyecto_id,
        asignado
      ]
    );

    res.status(201).json({
      ok: true,
      message: 'Task created!',
      id: rows[0].id
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const getTasks = async(req, res ) => {

  try {
    
    const { id } = req.query

    let query = 'SELECT * FROM tareas'

    if (id) {

      query+= ' WHERE id = $1 ';
      
      const { rows } = await pool.query(
        query,
        [ id ]
      );

      if ( rows.length ) {
        return res.status(200).json({
          ok: true,
          task: rows[0]
        });
      } else {
        return res.status(404).json({ ok: false, message: `Task with id, ${id} not found!` });
      }
    } else {
      const { rows } = await pool.query(
        query
      );
      return res.status(200).json({
        ok: true,
        tasks: rows
      });
    }
    
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const updateTask = async (req, res) => {

  try {

    const { id } = req.params;
    
    const {
        estado
    } = req.body;
    
    const { rows } = await pool.query(
      "UPDATE tareas SET estado = $1 WHERE id = $2 RETURNING *",
      [
        estado,
        id,
      ]
    );

    if ( !rows.length ) {
        return res.status(404).json({
            ok: false,
            message: `Task with id ${id} not found!`
        })
    }
    
    res.status(201).json({
      ok: true,
      message: 'Task was updated - Sending Notification via Email to the assigned user!',
      id: rows[0].id
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
    createTask,
    getTasks,
    updateTask
}