const axios = require("axios");
const Dev = require("../models/Dev");

const parseStringAsArray = require("../utils/parseStringAsArray");

// Funções Controller: index, show, store, update, destroy

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiResp = await axios.get(
        `https://api.github.com/users/${github_username}`
      );
      const { name = login, avatar_url, bio } = apiResp.data;
      const techsArray = parseStringAsArray(techs);
      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });
    }
    return res.json(dev);
  },

  async update(req, res) {
    const { github_username } = req.params;

    const oldDev = await Dev.findOne({ github_username });

    const {
      name = oldDev.name,
      techs = oldDev.techs,
      avatar_url = oldDev.avatar_url,
      bio = oldDev.bio,
      latitude = oldDev.position.latitude,
      longitude = oldDev.position.longitude
    } = req.body;

    const location = {
      type: "Point",
      coordinates: [longitude, latitude]
    };

    const dev = await Dev.updateOne(
      {
        github_username
      },
      {
        name,
        techs: parseStringAsArray(techs),
        avatar_url,
        bio,
        location
      }
    );

    return res.json(dev);
  },

  async destroy(req, res) {
    const { github_username } = req.params;
    const dev = await Dev.deleteOne({ github_username });

    return res.json(dev);
  }

  //TODO - Método Update (editar Dev(Nome, techs, Avatar, Bio, Localização)), Método Destroy(deletar Dev)
};
