import './App.css'
import { AddProductToList } from './components/add-product-to-list';
import { RemoveCrossedOutProduct } from './components/remove-crossed-out-product';
import { SeachEngine } from './components/search-engine';
import { useConnectionDatabase } from './conection-database';
import { useScreenSize } from './hooks/use-screen-size';

function App() {

  const { width, height } = useScreenSize();

  const urlConnectionBackend = useConnectionDatabase();

  return (
      <div style={ { width: width < 800 ? width *90 /100 : width < 619 ? width *95 /100 : width *90 / 100 } } className='container-body'>
        {
          urlConnectionBackend && (
            <>
              <SeachEngine urlConnectionBackend = { urlConnectionBackend } />
              <RemoveCrossedOutProduct urlConnectionBackend = { urlConnectionBackend } />
              <AddProductToList urlConnectionBackend = { urlConnectionBackend } />
            </>
          )
        }
      </div>
  );
}

export default App
