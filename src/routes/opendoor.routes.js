import { Router } from "express";

// rutas
import { backend, apiBase, getLogs, openDoor } from "../controllers/opendoor.controller.js";
import { getClientes, crearCliente, editarCliente, eliminarCliente } from "../controllers/clientes.controller.js";
import { getSensores, crearSensor, editarSensor, eliminarSensor } from "../controllers/sensores.controller.js";
import { crearUsuario, editarUsuario, eliminarUsuario, login, logout } from "../controllers/usuarios.controller.js";

const router = Router();

// Son rutas estaticas
// ver home del backend (lo mismo que entrar a backend.html)
router.get("/backend", backend);
router.get("/api", apiBase);
router.post("/api/opendoor",openDoor);  // función que ejecuta cada vez que hago click en el link de apertura de puerta

// Backend Logs
router.get("/api/logs", getLogs);

// Backend Sensores
router.get("/api/sensores", getSensores);
router.post("/api/sensores", crearSensor);
router.post("/api/sensores/:id", editarSensor);
router.delete("/api/sensores/:id", eliminarSensor);

// Backend Pasajeros/Clientes
router.get("/api/clientes", getClientes);
router.post("/api/cliente", crearCliente);
router.post("/api/cliente/:id", editarCliente);
router.delete("/api/cliente/:id", eliminarCliente);

// Backend Usuario
router.get("/api/login", login);
router.get("/api/logout", logout);
router.post("/api/user", crearUsuario);
router.post("/api/user/:id", editarUsuario);
router.delete("/api/user/:id", eliminarUsuario);

export default router;