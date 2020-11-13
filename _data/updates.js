const axios = require('axios');

module.exports = async function () {
  return axios
    .get('https://pietvanzoen.github.io/updates/updates.json')
    .then(function (response) {
      return response.data.updates;
    })
    .catch(function (error) {
      console.log(error);
    });
};
