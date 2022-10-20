import React, { useContext, useState, useEffect } from 'react';

import StarWarsContext from '../context/StarWarsContext';

const INITIAL_FILTER = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
];

function PlanetsTable() {
  const [isLoading, setIsLoading] = useState(true);
  const [column, setColumn] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [selectedColumn, setSelectedColum] = useState('population');
  const [selectedOperator, setSelectedOperator] = useState('maior que');
  const [selectedValue, setSelectedValue] = useState(0);
  const [filterOptions, setFilterOptions] = useState(INITIAL_FILTER);
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
    if (objectsFilters.length > 0 && selectedOperator === 'maior que') {
      const doubleFilter = filteredPlanets.filter(
        (objPlanets) => +(objPlanets[selectedColumn])
          > +(selectedValue),
      );
      console.log('maior que', doubleFilter);
      setFilteredPlanets(doubleFilter);
      setSelectedOperator('maior que');
      setSelectedValue(0);
      setSelectedColum(filterOptions[0]);
    }
    if (objectsFilters.length > 0 && selectedOperator === 'menor que') {
      const doubleFilter = filteredPlanets.filter(
        (objPlanets) => +(objPlanets[selectedColumn])
          < +(selectedValue),
      );
      console.log('menor que', doubleFilter);
      setFilteredPlanets(doubleFilter);
      setSelectedOperator('maior que');
      setSelectedValue(0);
      setSelectedColum(filterOptions[0]);
    }
    if (objectsFilters.length > 0 && selectedOperator === 'igual a') {
      const doubleFilter = filteredPlanets.filter(
        (objPlanets) => +(objPlanets[selectedColumn])
          === +(selectedValue),
      );
      console.log('igual a ', doubleFilter);
      setFilteredPlanets(doubleFilter);
      setSelectedOperator('maior que');
      setSelectedValue(0);
      setSelectedColum(filterOptions[0]);
    }
    if (objectsFilters.length === 0) {
      setFilteredPlanets(newFiltered);
    }
  }, [searchInput, planetList, objectsFilters, filterOptions]);

  // salva novo set de filtros
  function handleClick() {
    const filterOption = {
      selectedColumn, selectedOperator, selectedValue,
    };
    setObjectsFilters((prev) => [...prev, filterOption]);
    setFilterOptions(filterOptions.filter((e) => e !== selectedColumn));
  }

  return (
    <div>
      <input
        type="text"
        value={ searchInput }
        onChange={ ({ target }) => setSearchInput(target.value) }
        data-testid="name-filter"
      />
      <br />
      <label htmlFor="column-filter">
        Colun:
        <select
          name="column-filter"
          id="column-filter"
          data-testid="column-filter"
          value={ selectedColumn }
          onChange={ ({ target }) => setSelectedColum(target.value) }
        >
          { filterOptions.map(
            (filtro) => <option value={ filtro } key={ filtro }>{filtro}</option>,
          )}
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
      { objectsFilters.map((filtro) => (
        <div key={ filtro.selectedColumn }>
          <span>
            {filtro.selectedColumn}
            {' '}
            {filtro.selectedOperator}
            {' '}
            {filtro.selectedValue}
          </span>
          <button
            type="button"
            data-testid="button-remove-filters"
          >
            Remover
          </button>
        </div>
      ))}
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
