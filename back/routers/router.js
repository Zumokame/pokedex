import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import expressJSDocSwagger from "express-jsdoc-swagger";

import { Router } from "express";
import { router as pokemonRouter } from "./pokemonRouter.js";
import { router as typeRouter } from "./typeRouter.js";
import { router as teamRouter } from "./teamRouter.js";

// Main API router
export const router = Router();

// All sub-routers go here !
router.use(pokemonRouter);
router.use(typeRouter);
router.use(teamRouter);

// API documentation (Swagger)
expressJSDocSwagger(router)(buildSwaggerConfig());

function buildSwaggerConfig() {
  return {
    info: {
      version: "1.0.0",
      title: "O'Pokédex",
      description: "Deviens le meilleur dresseur !",
    },
    servers: [{
      url: `http://localhost:${process.env.PORT || 3000}/api`,
    }],
    baseDir: resolve(dirname(fileURLToPath(import.meta.url)), ".."),
    swaggerUIPath: '/docs',
  };
}