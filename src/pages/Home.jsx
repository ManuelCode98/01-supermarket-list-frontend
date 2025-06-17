import { SearchEngine } from '../components/search-engine/search-engine';
import { RemoveCrossedOutProduct } from '../components/remove-crossed-out-product';
import { AddProductToList } from '../components/add-product-to-list';
import { useConnectionDatabase } from '../conection-database';

const Home = () => {

    const urlConnectionBackend = useConnectionDatabase();

  return (
    <>
        <SearchEngine urlConnectionBackend = { urlConnectionBackend } />
        <RemoveCrossedOutProduct urlConnectionBackend = { urlConnectionBackend } />
        <AddProductToList urlConnectionBackend = { urlConnectionBackend } />
    </>
  )
}

export default Home
