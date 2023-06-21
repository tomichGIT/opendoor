import { Router } from "express";

// rutas
import { backend, apiBase, getLogs, crearLog } from "../controllers/opendoor.controller.js";
import { getClientes, crearCliente, editarCliente, eliminarCliente } from "../controllers/clientes.controller.js";
import { getSensores, crearSensor, editarSensor, eliminarSensor } from "../controllers/sensores.controller.js";
import { crearUsuario, editarUsuario, eliminarUsuario, login, logout } from "../controllers/usuarios.controller.js";

const router = Router();

// Son rutas estaticas
// ver home del backend (lo mismo que entrar a backend.html)
router.get("/backend", backend);
router.get("/api", apiBase);

// Backend Logs
router.get("/api/logs", getLogs);
router.post("/api/logs", crearLog);

// Backend Sensores
router.get("/api/sensores", getSensores);

// Backend Pasajeros/Clientes
router.get("/api/clientes", getClientes);
router.post("/api/cliente", crearCliente);
router.patch("/api/cliente/:id", editarCliente);
router.delete("/api/cliente/:id", eliminarCliente);

// Backend Usuario
router.get("/api/login", login);
router.get("/api/logout/:id", logout);
router.post("/api/user", crearUsuario);
router.patch("/api/user/:id", editarUsuario);
router.delete("/api/user/:id", eliminarUsuario);

export default router;