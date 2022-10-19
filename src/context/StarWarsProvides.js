import React, { useState } from 'react';
import PropTypes from 'prop-types';

import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [planetList, setPlanetList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const requestPlanets = async () => {
    setIsLoading(true);
    const endPoint = 'https://swapi.dev/api/planets';
    const response = await fetch(endPoint);
    const { results } = await response.json();
    results.map((e) => delete e.residents);
    console.log(results);
    setPlanetList(results);
    setIsLoading(false);
  };

  const contextValue = React.useMemo(() => (
    { requestPlanets, planetList, isLoading }), [planetList, isLoading]);

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
