import React, { useContext, useState, useEffect } from 'react';

import StarWarsContext from '../context/StarWarsContext';

function PlanetsTable() {
  const [isLoading, setIsLoading] = useState(true);
  const [column, setColumn] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [selectedColumn, setSelectedColum] = useState('population');
  const [selectedOperator, setSelectedOperator] = useState('maior que');
  const [selectedValue, setSelectedValue] = useState(0);
  const [objectsFilters, setObjectsFilters] = useState([]);

  const { planetList } = useContext(StarWarsContext);

  // didmount puxa requisição
  useEffect(() => {
    setFilteredPlanets(planetList);
    if (planetList.length > 0) {
      setColumn(Object.keys(planetList[0]));
      setIsLoading(false);
    }
  }, [planetList]);

  // atualização de filtros
  useEffect(() => {
    const newFiltered = planetList.filter(
      (planet) => planet.name.includes(searchInput),
    );
    if (objectsFilters.length > 0 && objectsFilters[0].selectedOperator === 'maior que') {
      const doubleFilter = newFiltered.filter(
        (objPlanets) => +(objPlanets[objectsFilters[0].selectedColumn])
          > +(objectsFilters[0].selectedValue),
      );
      console.log('maior que', doubleFilter);
      setFilteredPlanets(doubleFilter);
      setSelectedOperator('maior que');
      setSelectedValue(0);
      setSelectedColum('population');
    }
    if (objectsFilters.length > 0 && objectsFilters[0].selectedOperator === 'menor que') {
      const doubleFilter = newFiltered.filter(
        (objPlanets) => +(objPlanets[objectsFilters[0].selectedColumn])
          < +(objectsFilters[0].selectedValue),
      );
      console.log('menor que', doubleFilter);
      setFilteredPlanets(doubleFilter);
      setSelectedOperator('maior que');
      setSelectedValue(0);
      setSelectedColum('population');
    }
    if (objectsFilters.length > 0 && objectsFilters[0].selectedOperator === 'igual a') {
      const doubleFilter = newFiltered.filter(
        (objPlanets) => +(objPlanets[objectsFilters[0].selectedColumn])
          === +(objectsFilters[0].selectedValue),
      );
      console.log('igual a ', doubleFilter);
      setFilteredPlanets(doubleFilter);
      setSelectedOperator('maior que');
      setSelectedValue(0);
      setSelectedColum('population');
    }
    if (objectsFilters.length === 0) {
      setFilteredPlanets(newFiltered);
    }
  }, [searchInput, planetList, objectsFilters]);

  // salva novo set de filtros
  function handleClick() {
    const filterOption = {
      selectedColumn, selectedOperator, selectedValue,
    };
    setObjectsFilters((prev) => [...prev, filterOption]);
  }

  return (
    <div>
      <p>teste</p>
      <input
        type="text"
        value={ searchInput }
        onChange={ ({ target }) => setSearchInput(target.value) }
        data-testid="name-filter"
      />
      <label htmlFor="column-filter">
        Colun:
        <select
          name="column-filter"
          id="column-filter"
          data-testid="column-filter"
          value={ selectedColumn }
          onChange={ ({ target }) => setSelectedColum(target.value) }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="comparison-filter">
        Operator:
        <select
          name="comparison-filter"
          id="comparison-filter"
          data-testid="comparison-filter"
          value={ selectedOperator }
          onChange={ ({ target }) => setSelectedOperator(target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <input
        type="number"
        data-testid="value-filter"
        value={ selectedValue }
        onChange={ ({ target }) => setSelectedValue(target.value) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => handleClick() }
      >
        Filtrar
      </button>
      { isLoading ? <p>Loading...</p>
        : (
          <table>
            <thead>
              <tr>
                { column.map((coluna) => (
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
