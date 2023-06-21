import { Router } from "express";

// rutas
import { backend, apiBase, verLogs, crearLog } from "../controllers/opendoor.controller.js";
import { crearCliente, editarCliente, eliminarCliente } from "../controllers/clientes.controller.js";
import { crearUsuario, editarUsuario, eliminarUsuario, login, logout } from "../controllers/usuarios.controller.js";

const router = Router();

// Son rutas estaticas
// ver home del backend (lo mismo que entrar a backend.html)
router.get("/backend", backend);
router.get("/api", apiBase);

// Backend Logs
router.get("/api/logs", verLogs);
router.post("/api/logs", crearLog);

// Backend Pasajeros
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