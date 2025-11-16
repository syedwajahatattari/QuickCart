// FILE: app/product/[id]/[citySlug]/page.js
// --- This is your new Server Component ---

import ProductPageClient from "@/components/ProductPageClient"; // Import client component
// --- CHANGE 1: Import your real product data ---
import { productsDummyData, allCities } from "@/assets/assets.js";
// --- MOCK Functions (Replace with your database) ---

async function getProductById(id) {
    // We find the product in the imported list
    const product = productsDummyData.find(p => p._id === id);
    
    // Return the real product
    return product; 
  }
// Creating a list of 200 cities with slugs and countries is a great step.


// --- THIS FUNCTION IS UPDATED ---
async function getCityData(citySlug) {
    // 1. We look inside our 'allCities' array
    const city = allCities.find(c => c.slug === citySlug);

    // 2. If we find a city, we return it.
    if (city) {
      return city;
    }

    // 3. If not found, return a default
    return {
        slug: citySlug,
        name: 'Unknown City', // Or capitalize the slug
        country: 'Unknown'
    };
}
// --- End of MOCK Functions ---


// This is the ISR (on-demand) setting.
// It tells Next.js to build pages that aren't pre-built.
export const dynamicParams = true;

// This function will return an empty list.
// This gives you INSTANT build times.
// `dynamicParams = true` will build all 10,000+ pages on-demand
// as they are visited for the first time.
// --- CHANGE 3: We can *now* create all params! ---
// (But we'll still use ISR)
export async function generateStaticParams() {
    // For instant builds, we still return [].
    // `dynamicParams = true` will build pages on demand
    // using your real product and city data.
    return [];
    
    // --- FOR THE FUTURE ---
    // If you wanted to pre-build all 10,000+ pages,
    // you would do this instead:
    /*
    const allParams = [];
    for (const city of allCities) {
      for (const product of productsDummyData) {
        allParams.push({
          id: product._id,
          citySlug: city.slug
        });
      }
    }
    return allParams;
    */
  }

// This is the main Page component. It's a Server Component.
// It gets the params from the new folder names: [id] and [citySlug]
export default async function ProductPage({ params }) {
  
  // `params` will look like: { id: '123-abc', citySlug: 'new-york' }
  const { id, citySlug } = params;

  // 1. Fetch the data for THIS product on the server
  const productData = await getProductById(id);
  
  // 2. (Optional) Fetch data for THIS city
  const cityData = await getCityData(citySlug);

  console.log("SERVER DATA (check your terminal):", productData);
  // 3. Render your CLIENT component and pass the data down as props
  return (
    <ProductPageClient 
      productData={productData} 
      cityData={cityData} 
    />
  );
}