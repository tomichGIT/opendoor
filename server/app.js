import express from "express";
import path from "path";
import { PUBLIC_PATH } from "../config/config.js";
//import morgan from "morgan";


import appRoutes from "./routes/opendoor.routes.js";

const app = express();


// Middlewares

// Morgan es un middlewear que hace console de los requests de clientes.
//app.use(morgan("dev"));

// no se que dif con body parser
// Express lo usa para recibir el "body" como JSON
app.use(express.json());



// resuelve las rutas de los archivos estáticos
// Serve the static frontend assets
//app.use(express.static(path.resolve("server/public")));
app.use(express.static(path.resolve(PUBLIC_PATH)));
//app.use(express.static(path.join(__dirname, 'app', 'client', 'public')));

// Routes
app.use("/", appRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found", error:1 });
});

export default app;