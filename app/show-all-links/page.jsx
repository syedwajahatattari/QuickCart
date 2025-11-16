// FILE: app/show-all-links/page.js

import Link from 'next/link';
// 1. Import your local data directly
import { productsDummyData } from '@/assets/assets.js';
import { allCities } from '@/assets/assets.js';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// This is a Server Component, so we can use 'async'
export default async function ShowAllLinksPage() {

  // 2. We already have the data, no fetching needed.
  const products = productsDummyData;
  const cities = allCities;

  return (
    <>
    <Navbar/>
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Product City Link Generator</h1>
      <p>Showing all possible product and city combinations from local data.</p>
      
      {/* 3. Loop through each product */}
      {products.map((product) => (
        <div key={product._id} style={{ marginBottom: '20px' }}>
          
          <h2 style={{ borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>
            {product.name}
          </h2>
          
          <ul style={{ listStyle: 'none', paddingLeft: '10px' }}>
            {/* 4. For each product, loop through all 200 cities */}
            {cities.map((city) => (
              <li key={city.slug} style={{ margin: '5px 0' }}>
                
                {/* 5. Create the dynamic link */}
                <Link 
                  href={`/product/${product._id}/${city.slug}`}
                  style={{ textDecoration: 'underline', color: 'blue' }}
                >
                  {product.name} Available in {city.name}
                </Link>
                
              </li>
            ))}
          </ul>
        </div>
      ))}
      
    </div>
    <Footer />
    </>
  );
}