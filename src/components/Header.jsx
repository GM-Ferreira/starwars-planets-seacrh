import React, { useContext, useEffect } from 'react';

import StarWarsContext from '../context/StarWarsContext';

function Header() {
  const { requestPlanets } = useContext(StarWarsContext);

  useEffect(() => {
    const getPlanets = async () => {
      await requestPlanets();
    };
    getPlanets();
  }, []);

  return (
    <div>
      STAR WARS
    </div>
  );
}

export default Header;
