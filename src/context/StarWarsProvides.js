import React, { useState } from 'react';
import PropTypes from 'prop-types';

import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [planetList, setPlanetList] = useState([]);

  const requestPlanets = async () => {
    const endPoint = 'https://swapi.dev/api/planets';
    const response = await fetch(endPoint);
    const { results } = await response.json();
    results.map((e) => delete e.residents);
    // console.log(results);
    setPlanetList(results);
  };

  const contextValue = React.useMemo(() => (
    { requestPlanets, planetList }), [planetList]);

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
