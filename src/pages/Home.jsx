import { SearchEngine } from '../components/search-engine/search-engine';
import { RemoveCrossedOutProduct } from '../components/remove-crossed-out-product/remove-crossed-out-product';
import { AddProductToList } from '../components/add-product-to-list/add-product-to-list';
import { urlConnectionBackend } from '../index';


const Home = () => {    

  return (
    <>
        <SearchEngine urlConnectionBackend = { urlConnectionBackend } />
        <RemoveCrossedOutProduct urlConnectionBackend = { urlConnectionBackend } />
        <AddProductToList urlConnectionBackend = { urlConnectionBackend } />
    </>
  )
}

export default Home
