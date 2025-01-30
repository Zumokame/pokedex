import "dotenv/config";
import express from "express";
import cors from "cors";
import { router as apiRouter } from "./routers/router.js"; // Attention, ajouter l'extension en ESM

// Création de l'app
export const app = express();

// Autoriser les requêtes "cross-origin"
app.use(cors());


// Body parsers
app.use(express.urlencoded({ extended: true })); // Body parser pour traiter les body au format des formulaires HTMP (`applicaiton/x-www-urlencoded`)
app.use(express.json()); // Body parser pour traiter les body au format JSON (`application/json`)

// Default route "/"
const docsRoute = (req, res) => {
  res.json({
    message: "Welcome to O'Pokédex API !",
    documentation: "http://localhost:3000/api/docs"
  });
}
app.get("/", docsRoute);
app.get("/api", docsRoute);

// Configurer le router de l'API
app.use("/api", apiRouter); // On pourrait mettre `/api/v1` si on prévoit de maintenir le système longtemps

// Middleware 404 (global)
app.use((req, res) => {
  res.send("Not Found"); // ou mieux : rediriger vers la documentation de l'API
});
// Démarrer le serveur
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`🚀 Server listening at http://localhost:${port}`);
});