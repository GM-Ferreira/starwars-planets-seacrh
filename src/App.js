import React from 'react';

import './App.css';
import StarWarsProvider from './context/StarWarsProvides';
import PlanetsTable from './components/PlanetsTable';
import Header from './components/Header';

function App() {
  return (
    <StarWarsProvider>
      <Header />
      <PlanetsTable />
    </StarWarsProvider>
  );
}

export default App;
