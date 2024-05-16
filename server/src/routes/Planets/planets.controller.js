
const {getAllPlanets}=('../../models/planets.model')

async function httpGetAllPlanets(req, res){
    return res.status(200).json(await getAllPlanets)
}


function planetsData() {
    return new Promise((resolve, reject) => {
      fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
        .pipe(parse({
          comment: '#',
          columns: true,
        }))
        .on('data', async (data) => {
          if (isHabitablePlanet(data)) {
            savePlanet(data);
          }
        })
        .on('error', (err) => {
          console.log(err);
          reject(err);
        })
        .on('end', async () => {
          const countPlanetsFound = (await getAllPlanets()).length;
          console.log(`${countPlanetsFound} habitable planets found!`);
          resolve();
        });
    });
  }

module.exports = {
planetsData,
    httpGetAllPlanets,}