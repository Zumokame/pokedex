import { Team, Pokemon } from "../models/index.js";

/**
 * Give all the teams in DB
 * @param {*} req
 * @param {*} res
 * @returns {Array} of Team Objects
 */
export async function getAllTeams(req, res) {
  const teams = await Team.findAll();
  if (!teams) return res.status(404).json("Pas de team en bdd");
  res.status(200).json(teams);
}

/**
 * Give all the teams in DB with pokemon
 * @param {*} req
 * @param {*} res
 * @returns {Array} of Team Objects with pokemons property
 */
export async function getAllTeamsAndPokemons(req, res) {
  const teams = await Team.findAll({
    include: "pokemons",
  });
  if (!teams) return res.status(404).json("Pas de team en bdd");
  res.status(200).json(teams);
}

export async function getOneTeamAndPokemons(req, res) {
  const { id } = req.params;
  const team = await Team.findByPk(Number(id), {
    include: [
      {
        association: "pokemons",
        include: "types",
      },
    ],
  });
  if (!team) return res.status(404).json(`Pas de team à l'id : ${id}`);
  res.status(200).json(team);
}

export async function createTeam(req, res) {
  console.log(req.body);
  const { name, description } = req.body;
  if (!name) return res.status(400).json("A team should have a name");
  const team = await Team.create({ name, description });
  if (!team) return res.status(400).json("Something went wrong");
  res.status(200).json(team);
}

export async function addPokemonToTeam(req, res) {
  const { idPokemon, idTeam } = req.params;
  const pokemon = await Pokemon.findByPk(idPokemon);
  const team = await Team.findByPk(idTeam, {
    include: [
      {
        association: "pokemons",
        include: "types",
      },
    ],
  }); 
  await team.addPokemon(pokemon);
  await team.reload();
  if (team.pokemons.length >= 5) {
    return res.status(401).json("trop de pokemon dans la team");
  }
  res.status(200).json(team);
}

export async function editTeam(req, res) {
  const { team_name, description } = req.body;
  const { id } = req.params;
  if (!id || !team_name)
    return res.status(404).json("Manque le name ou id de la team");
  const team = await Team.findByPk(id);
  team.name = team_name;
  if (description) team.description = description;
  await team.save();
  res.status(200).json(team);
}

export async function removePokemonFromTeam(req, res) {
  const { pkmId, teamId } = req.params;
  console.log(pkmId);
  console.log(teamId)
  if (!pkmId || !teamId) return res.status(404).json("Manque un des deux ID");
  const team = await Team.findByPk(teamId, { include : {association:"pokemons", include : "types"}});
  console.log(team)
  const pokemon = await Pokemon.findByPk(pkmId);
  await team.removePokemon(pokemon);
  await team.reload();
  res.status(200).json(team);
}
