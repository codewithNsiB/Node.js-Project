const { parse } = require("csv-parse");
const fs = require("fs");
const path = require ('path');
const { getAllPlanets } = require("../routes/Planets/planets.controller");



function isHabitablePlanet(planet) {
  return planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
}

//  const promise = new Promise((resolve, reject)=>{   resolve(42)})
// promise.then((result)=>{

// })
// const result =await promise
// console.log(result);

function loadPlanetData(){
   return new Promise((resolve, reject)=>{
    fs.createReadStream(path.join)(__dirname, '../../data/kepler_data.csv')
    .pipe(
      parse({
        comment: "#",
        columns: true,
      })
    )
    .on("data",async (data) => {
      if (isHabitablePlanet(data)){
        await planetsData.create(
          {
            keplerName: data.kepler_name,
          }
        );
      }
    
    })
    .on("error", (err) => {
      console.log(err);
      reject(err)
    })
  
    .on("end", async() => {
      const countPlanetFound = await( getAllPlanets()).length;
      console.log(`${countPlanetFound}habitable planets found!`);
      resolve()
    });

    async function getAllPlanets() {
      return await planets.find({},{
        'id':0,'__v':0, //used to exclude fields from response
      })
    }
  
    module.exports = {
      getAllPlanets,
      loadPlanetData,
    }
   }) 
}


