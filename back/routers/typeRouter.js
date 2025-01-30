import { Router } from "express";
import { controllerWrapper as cw } from "../utils/controllerWrapper.js";
import * as typeController from '../controllers/typeController.js';

export const router = Router();

/**
 * GET /types
 * @tags Type
 * @summary Returns all types
 * @return {Type[]} 200 - Success response
 */
router.get('/types', cw(typeController.getAllTypes));

/**
 * GET /types/{id}
 * @tags Type
 * @summary Returns a type by ID with all its pokemons
 * @param {number} id.path.required - Type ID
 * @return {Type} 200 - Success response
 * @return {Error} 404 - Not found response
 */
router.get('/type/:id/pokemons', cw(typeController.getOneTypeAndPokemons));