const api = require('../api');

const getAllCountries = async (req,res) => {
    const query = `
      query {
        countries {
          name
          code
          capital
        }
      }
    `;
    try{
        let response = await api.post("/", {query});
        // console.log(response.data.data);
        res.status(200).json({ data : response.data.data });
    }
    catch(err){
        console.log(err);
    }

}

const getCountriesGame = async (req,res) => {
    const query = `
      query {
        countries {
          name
          code
          languages{name}
          capital
          continent{name}
        }
      }
    `;
    try{
        let response = await api.post("/", {query});
        // console.log(response.data.data);
        res.status(200).json({ data : response.data.data });
    }
    catch(err){
        console.log(err);
    }

}

const getCountry = async (req,res) => {
    const query = `
    query {
      country(code: "${req.params.code}") {
        name
        code
        continent{name}
        capital
        emoji
        currency
        phone
        languages{name}
      },
    }
    `;
    const variables = {code : req.params.code};
    try{
        let response = await api.post("/", {query});
        // console.log(response.data.data);
        res.status(200).json({ data : response.data.data });
    }
    catch(err){
        console.log(err);
    }

}

exports.getAllCountries = getAllCountries;
exports.getCountry = getCountry;
exports.getCountriesGame = getCountriesGame;