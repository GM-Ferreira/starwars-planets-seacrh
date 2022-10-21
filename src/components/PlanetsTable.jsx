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

  useEffect(() => {
    const newFiltered = planetList.filter(
      (planet) => planet.name.includes(searchInput),
    );
    if (objectsFilters.length === 0) {
      setFilteredPlanets(newFiltered);
    }
    setSelectedOperator('maior que');
    setSelectedValue(0);
    setSelectedColum(filterOptions[0]);
  }, [searchInput, planetList, objectsFilters, filterOptions]);

  const functionFilterObject = (filtros) => {
    // objectsFilters; => filtros salvos
    // filteredPlanets; => planetas após search digitado que faz o map e monta tabela
    // planetList; => lista original com todos planetas

    let newArray = [...planetList];

    filtros.forEach((filtro) => {
      newArray = newArray.filter(
        (e) => Number(e[filtro.selectedColumn]) > (filtro.selectedValue),
      );
    });
    setFilteredPlanets(newArray);
  };

  // Salva novo set de filtros
  function handleClick() {
    const filterOption = {
      selectedColumn, selectedOperator, selectedValue,
    };
    setObjectsFilters((prev) => [...prev, filterOption]);
    setFilterOptions(filterOptions.filter((e) => e !== selectedColumn));

    if (selectedOperator === 'maior que') {
      const doubleFilter = filteredPlanets.filter(
        (objPlanets) => +(objPlanets[selectedColumn])
          > +(selectedValue),
      );
      setFilteredPlanets(doubleFilter);
    }
    if (selectedOperator === 'menor que') {
      const doubleFilter = filteredPlanets.filter(
        (objPlanets) => +(objPlanets[selectedColumn])
          < +(selectedValue),
      );
      setFilteredPlanets(doubleFilter);
    }
    if (selectedOperator === 'igual a') {
      const doubleFilter = filteredPlanets.filter(
        (objPlanets) => +(objPlanets[selectedColumn])
          === +(selectedValue),
      );
      setFilteredPlanets(doubleFilter);
    }
  }

  // Remove filtros parciais
  const handleRemove = (option) => {
    setFilterOptions((prev) => [...prev, option]); // coloco o filtro pra ser usado de novo no form
    setObjectsFilters((prev) => {
      const filtros = prev.filter((e) => e.selectedColumn !== option);
      functionFilterObject(filtros);
      return filtros;
    }); // tiro ele da lista de filtros aplicados
  };

  // remove todos os filtros
  const handleRemoveAll = () => {
    setFilterOptions(INITIAL_FILTER);
    setObjectsFilters([]);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="digite para pesquisar planetas"
        value={ searchInput }
        onChange={ ({ target }) => setSearchInput(target.value) }
        data-testid="name-filter"
      />
      <br />
      <label htmlFor="column-filter">
        Column:
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
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ () => handleRemoveAll() }
      >
        Remover filtros
      </button>
      { objectsFilters.map((filtro) => (
        <div key={ filtro.selectedColumn } data-testid="filter">
          <span>
            {filtro.selectedColumn}
            {' '}
            {filtro.selectedOperator}
            {' '}
            {filtro.selectedValue}
          </span>
          <button
            type="button"
            onClick={ () => handleRemove(filtro.selectedColumn) }
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
