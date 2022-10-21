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
  const [selectedSort, setSelectedSort] = useState('population');
  const [selectedRadio, setSelectedRadio] = useState();
  const [filterOptions, setFilterOptions] = useState(INITIAL_FILTER);
  const [objectsFilters, setObjectsFilters] = useState([]);
  const [sortButton, setSortButton] = useState(true);

  const { planetList } = useContext(StarWarsContext);

  // componentDidMount
  useEffect(() => {
    setFilteredPlanets(planetList);
    if (planetList.length > 0) {
      setColumn(Object.keys(planetList[0]));
      setIsLoading(false);
    }
  }, [planetList]);

  // Update => faz pesquisa com texto digitado
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

  // Função que confere filtros restantes após remoção e atualiza a lista
  const functionFilterObject = (filtros) => {
    // objectsFilters; => filtros salvos
    // filteredPlanets; => planetas após search digitado que faz o map e monta tabela
    // planetList; => lista original com todos planetas

    let newArray = [...planetList];
    filtros.forEach((filtro) => {
      newArray = newArray.filter(
        (e) => {
          if (filtro.selectedOperator === 'maior que') {
            const test = Number(e[filtro.selectedColumn]) > (filtro.selectedValue);
            return test;
          }
          if (filtro.selectedOperator === 'menor que') {
            const test = Number(e[filtro.selectedColumn]) < (filtro.selectedValue);
            return test;
          }
          if (filtro.selectedOperator === 'igual a') {
            const test = Number(e[filtro.selectedColumn]) === (filtro.selectedValue);
            return test;
          }
          return test;
        },
      );
    });
    setFilteredPlanets(newArray);
  };

  // Salva novo set de filtros e filtra o array com a nova opção
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
    setFilterOptions((prev) => [...prev, option]);
    setObjectsFilters((prev) => {
      const filtros = prev.filter((e) => e.selectedColumn !== option);
      functionFilterObject(filtros);
      return filtros;
    });
  };

  // remove todos os filtros
  const handleRemoveAll = () => {
    setFilterOptions(INITIAL_FILTER);
    setObjectsFilters([]);
  };

  // ordena a lista de planetas

  const handleSort = () => {
    const sortedPlanets = [...filteredPlanets];
    if (selectedRadio === 'ASC') {
      sortedPlanets.sort(
        (a, b) => b[selectedSort] - a[selectedSort],
      );
      sortedPlanets.sort(
        (a, b) => (a[selectedSort] - b[selectedSort]),
      );
      return setFilteredPlanets(sortedPlanets);
    }
    if (selectedRadio === 'DESC') {
      return setFilteredPlanets(sortedPlanets.sort(
        (a, b) => b[selectedSort] - a[selectedSort],
      ));
    }
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
      <label htmlFor="comparison-filter">
        Sort by:
        <select
          name="column-sort"
          id="column-sort"
          data-testid="column-sort"
          value={ selectedSort }
          onChange={ ({ target }) => setSelectedSort(target.value) }
        >
          { INITIAL_FILTER.map(
            (filtro) => <option value={ filtro } key={ filtro }>{filtro}</option>,
          )}
        </select>
      </label>
      <label htmlFor="ASC">
        ASC
        <input
          type="radio"
          id="ASC"
          name="ASC-DESC"
          data-testid="column-sort-input-asc"
          value="ASC"
          onChange={ ({ target }) => setSelectedRadio(target.value) }
        />
      </label>
      <label htmlFor="DESC">
        DESC
        <input
          type="radio"
          id="DESC"
          name="ASC-DESC"
          data-testid="column-sort-input-desc"
          value="DESC"
          onChange={ ({ target }) => setSelectedRadio(target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ handleSort }
      >
        Sort
      </button>
      <br />
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
                  <td data-testid="planet-name">{planet.name}</td>
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
