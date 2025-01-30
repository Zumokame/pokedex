import { Type, Team, Pokemon } from "../models/index.js";

/**
 * Give all the type in db
 * @param {*} req 
 * @param {*} res 
 * @returns {Array} of Type Object
 */

export async function getAllTypes (req, res) {
    const types = await Type.findAll();
    if(!types) return res.status(404).json('Pas de type en bdd');
    res.status(200).json(types)
}

/**
 * Give a specific type associate to id
 * @param {*} req - need id in req.params
 * @param {*} res 
 * @returns {Object} Type
 */
export async function getOneType (req, res){
    const {id} = req.params;
    const type = await Type.findByPk(id);
    if(!type) return res.status(404).json(`Pas de type à l'id : ${id}`);
    res.status(200).json(type);
}

/**
 * Give a specific type associate with id and its pokemons
 * @param {*} req 
 * @param {*} res 
 * @returns {Object} Type with pokemons property (Array)
 */
export async function getOneTypeAndPokemons (req, res){
    const {id} = req.params;
    const type = await Type.findByPk(id, {
        include : 'pokemons'
    })
    if(!type) return res.status(404).json(`Aucun type à l'id : ${id}`);
    res.status(200).json(type);
}

