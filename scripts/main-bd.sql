
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    email VARCHAR(50) UNIQUE,
    contrasena VARCHAR(120),
    rol VARCHAR(10) CHECK (rol IN ('admin', 'usuario'))
);

CREATE TABLE proyectos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    fecha_inicio DATE NOT NULL,
    fecha_finalizacion DATE,
    usuario_id INT,
    CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE tareas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    estado VARCHAR(20) CHECK (estado IN ('pendiente', 'en progreso', 'completada')),
    proyecto_id INT,
    asignada_a INT,
    CONSTRAINT fk_proyecto FOREIGN KEY (proyecto_id) REFERENCES proyectos(id),
    CONSTRAINT fk_usuario_asignada FOREIGN KEY (asignada_a) REFERENCES usuarios(id)
);
