import React, { useContext, useState, useEffect } from 'react';

import StarWarsContext from '../context/StarWarsContext';

function PlanetsTable() {
  const [isLoading, setIsLoading] = useState(true);
  const [colun, setColun] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [searchPlanet, setSearchPlanet] = useState('');
  const { planetList } = useContext(StarWarsContext);

  useEffect(() => {
    setFilteredPlanets(planetList);
    if (planetList.length > 0) {
      setColun(Object.keys(planetList[0]));
      setIsLoading(false);
    }
  }, [planetList]);

  function handleChange({ target }) {
    setSearchPlanet(target.value);
  }

  useEffect(() => {
    console.log(searchPlanet);
    const newFiltered = planetList.filter(
      (planet) => planet.name.includes(searchPlanet),
    );
    setFilteredPlanets(newFiltered);
  }, [searchPlanet, planetList]);

  return (
    <div>
      <p>teste</p>
      {console.log(filteredPlanets)}
      <input
        type="text"
        value={ searchPlanet }
        onChange={ (e) => handleChange(e) }
        data-testid="name-filter"
      />
      { isLoading ? <p>Loading...</p>
        : (
          <table>
            <thead>
              <tr>
                { colun.map((coluna) => (
                  <th key={ coluna }>{ coluna }</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredPlanets.map((planet) => (
                <tr key={ planet.name }>
                  <td>{planet.name}</td>
                  <td>{planet.rotation_period}</td>
                  <td>{planet.orbital_period}</td>
                  <td>{planet.diameter}</td>
                  <td>{planet.climate}</td>
                  <td>{planet.gravity}</td>
                  <td>{planet.terrain}</td>
                  <td>{planet.surface_water}</td>
                  <td>{planet.population}</td>
                  <td>{planet.films}</td>
                  <td>{planet.created}</td>
                  <td>{planet.edited}</td>
                  <td>{planet.url}</td>
                </tr>
              ))}
            </tbody>
          </table>)}
    </div>
  );
}

export default PlanetsTable;
