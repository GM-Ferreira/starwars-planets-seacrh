import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const INITIAL_FILTER = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ];
  const [planetList, setPlanetList] = useState([]);
  const [column, setColumn] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [objectsFilters, setObjectsFilters] = useState([]);
  const [filterOptions, setFilterOptions] = useState(INITIAL_FILTER);
  const [selectedColumn, setSelectedColum] = useState('population');
  const [selectedOperator, setSelectedOperator] = useState('maior que');
  const [selectedValue, setSelectedValue] = useState(0);
  const [selectedSort, setSelectedSort] = useState('population');
  const [selectedRadio, setSelectedRadio] = useState();

  const requestPlanets = async () => {
    const endPoint = 'https://swapi.dev/api/planets';
    const response = await fetch(endPoint);
    const { results } = await response.json();
    results.map((e) => delete e.residents);
    // console.log(results);
    setPlanetList(results);
  };

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

  const handleSearchInput = ({ target: { value } }) => {
    setSearchInput(value);
  };

  const handleRemoveAll = () => {
    setFilterOptions(INITIAL_FILTER);
    setObjectsFilters([]);
  };

  const contextValue = React.useMemo(() => (
    { requestPlanets,
      planetList,
      column,
      setColumn,
      filteredPlanets,
      setFilteredPlanets,
      searchInput,
      setSearchInput,
      objectsFilters,
      setObjectsFilters,
      filterOptions,
      setFilterOptions,
      INITIAL_FILTER,
      selectedColumn,
      setSelectedColum,
      selectedOperator,
      setSelectedOperator,
      selectedValue,
      setSelectedValue,
      selectedSort,
      setSelectedSort,
      selectedRadio,
      setSelectedRadio,
      handleSearchInput,
      handleRemoveAll }), [planetList,
    column, handleSearchInput, searchInput, setSearchInput, handleRemoveAll]);

  return (
    <StarWarsContext.Provider value={ contextValue }>
      {children}
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default StarWarsProvider;
