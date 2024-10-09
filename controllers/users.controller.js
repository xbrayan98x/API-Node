const pool = require("../db");
const bcrypt  = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
  
  try {

    const { name, email, password, rol } = req.body;

    const password_hash = await bcrypt.hash( '' + password, 10 );

    const { rows } = await pool.query(
      "INSERT INTO usuarios (nombre, email, contrasena, rol) VALUES ($1, $2, $3, $4) RETURNING id",
      [ name, email, password_hash, rol ]
    );

    res.status(201).json({
      ok: true,
      message: 'User created',
      id: rows[0].id
    });

  } catch (error) {
    
    return res.status(500).json({ error: error.message });
  }
}

const loginUser = async( req, res ) => {

  try {

    const {
      email,
      password
    } = req.body;

    const { rows } = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [ email]
    );

    if( !rows.length ){
      return res.status(404).json({ error: 'user not found' });
    }
    
    const matching = await bcrypt.compare( '' + password, rows[0].contrasena);

    if( !matching ){
      return res.status(400).json({ error: 'Check credentials' });
    }

    const token = jwt.sign(
      {
        id: rows[0].id,
        role: rows[0].rol
      }, 
      process.env.JWT_SECRET,
      {
        expiresIn: '3h'
      }
    );

    res.status(200).json({
      ok: true,
      token
    });

  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
}

module.exports = {
    createUser,
    loginUser
}