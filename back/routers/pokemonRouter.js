import { Router } from "express";
import { controllerWrapper as cw } from "../utils/controllerWrapper.js";
import * as pokemonController from "../controllers/pokemonController.js";


export const router = Router();


/**
 * GET /pokemons
 * @tags Pokemon
 * @summary Returns all Pokémons
 * @return {Pokemon[]} 200 - Success response
 */
router.get("/pokemons", cw(pokemonController.getAllPokemons));

/**
 * GET /pokemons/{id}
 * @tags Pokemon
 * @summary Returns the Pokémon corresponding to the requested ID
 * @param {number} id.path.required - The Pokémon ID
 * @return {Pokemon} 200 - Success response
 * @return {Error} 404 - Not found response
 */
router.get("/pokemon/:id", cw(pokemonController.getOnePokemonAndTypes))



