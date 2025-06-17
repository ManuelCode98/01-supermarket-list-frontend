import './App.css'

import { useScreenSize } from './hooks/use-screen-size';
import Home from './pages/home';

function App() {

  const { width, height } = useScreenSize();

  return (
      <div style={ { width: width < 800 ? width *90 /100 : width < 619 ? width *95 /100 : width *90 / 100 } } className='container-body'>
        <Home/>
      </div>
  );
}

export default App
