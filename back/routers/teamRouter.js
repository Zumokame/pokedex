import { Router } from "express";
import { controllerWrapper as cw } from "../utils/controllerWrapper.js";
import * as teamController from '../controllers/teamController.js';

export const router = Router();

/**
 * GET /teams
 * @tags Team
 * @summary Returns all teams
 * @return {Team[]} 200 - Success response
 * @return {Error} 404 - Not found response
 */
router.get('/teams', cw(teamController.getAllTeams));

/**
 * GET /teams/pokemons
 * @tags Team
 * @summary Returns all teams with all their pokemons
 * @return {Team[]} 200 - Success response
 * @return {Error} 404 - Not found response
 */
router.get('/teams/pokemons', cw(teamController.getAllTeamsAndPokemons));

/**
 * GET /teams/{id}/pokemons
 * @tags Team
 * @summary Returns a team by ID with all its pokemons
 * @param {number} id.path.required - Team ID
 * @return {Team} 200 - Success response
 * @return {Error} 404 - Not found response
 */
router.get('/team/:id/pokemons', cw(teamController.getOneTeamAndPokemons))

/**
 * GET /teams/{id}/pokemons/{idPokemon}
 * @tags Team
 * @summary Add a pokemon to a team
 * @param {number} id.path.required - Team ID
 * @param {number} idPokemon.path.required - Pokemon ID
 * @return {Team} 200 - Success response
 * @return {Error} 404 - Not found response
 */
router.get('/team/:idTeam/pokemon/:idPokemon', cw(teamController.addPokemonToTeam))

/**
 * PUT /teams/{id}
 * @tags Team
 * @summary Edit a team
 * @param {number} id.path.required - Team ID
 * @param {EditTeamDTO} request.body.required - the team body
 */
router.put('/team/:id', cw(teamController.editTeam));

/**
 * POST /teams
 * @tags Team
 * @summary Create a team
 * @param {CreateTeamDTO} request.body.required - the team body
 * @return {Team} 201 - the created team
 * @return {Error} 400 - Bad request response (ex: missing property)
 * @return {Error} 409 - Conflict response (ex: name already taken)
 */
router.post('/team', cw(teamController.createTeam));

/**
 * DELETE /teams/{id}/pokemons/{pokemonId}
 * @tags Team
 * @summary Remove a pokemon from a team
 * @param {number} id.path.required - Team ID
 * @param {number} pokemonId.path.required - Pokemon ID
 * @return {Team} 200 - Success response
 * @return {Error} 400 - Bad request response (ex: missing property)
 * @return {Error} 404 - Not found response
 */
router.delete('/team/:teamId/pokemon/:pkmId', cw(teamController.removePokemonFromTeam));
