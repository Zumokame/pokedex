import { Pokemon } from "../models/index.js";

/**
 * Give all the pokemons in DB
 * @param {*} req 
 * @param {*} res 
 * @returns {Array} of Pokemon Object 
 */
export async function getAllPokemons (req, res) {
    const pokemons = await Pokemon.findAll();
    if(!pokemons) return res.status(404).json('Aucun Pokemon dans la base');
    res.status(200).json(pokemons)
}

/**
 * Give a pokemon associate to number
 * @param {*} req - need number in req.params
 * @param {*} res 
 * @returns {Object} Pokemon
 */
export async function getOnePokemon (req, res){
    const {id} = req.params;
    const pokemon = await Pokemon.findOne({
        where : {
            id
        }
    });
    if(!pokemon) return res.status(404).json(`Le Pokemon numéro : ${number} n'existe pas.`);
    res.status(200).json(pokemon);
}

/**
 * Give a pokemon associate to number and its types
 * @param {*} req - need number in req.params
 * @param {*} res 
 * @returns {Objet} Pokemon with types property
 */
export async function getOnePokemonAndTypes (req, res){
    const {id} = req.params
    const pokemon = await Pokemon.findOne({
        where : {
            id
        },
        include: 'types'
    });
    if(!pokemon) return res.status(404).json('Aucun Pokemon dans la base');

    res.status(200).json(pokemon); 
}