// FILE: app/components/ProductPageClient.js
"use client"

import { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
// We no longer need useParams here!
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";
import React from "react";

// It receives `productData` and `cityData` as props from the server page
const ProductPageClient = ({ productData, cityData }) => {

    console.log("CLIENT PROPS (check your browser console):", productData);

    // We only need the functions from context, not the 'products' list
    const { router, addToCart, products: allProducts } = useAppContext(); 

    const [mainImage, setMainImage] = useState(null);
    
    // No more `productData` state, it's a prop!
    // No more `useEffect` to fetch data.

    // Set the initial image when the component loads
    useEffect(() => {
        if (productData && productData.image) {
            setMainImage(productData.image[0]);
        }
    }, [productData]); // This runs when productData is ready

    // We can use the cityData to make content dynamic
    const dynamicTitle = `${productData.name} (Available in ${cityData.name})`;
    const featuredProducts = allProducts.slice(0, 5); // Get featured from context

    return productData ? (<>
        <Navbar />
        <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="px-5 lg:px-16 xl:px-20">
                    <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
                        <Image
                            // Use mainImage state, or fallback to the prop
                            src={mainImage || productData.image[0]}
                            alt={productData.name}
                            className="w-full h-auto object-cover mix-blend-multiply"
                            width={1280}
                            height={720}
                            priority={true} // Good to add for the main image
                        />
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        {productData.image.map((image, index) => (
                            <div
                                key={index}
                                onClick={() => setMainImage(image)}
                                className="cursor-pointer rounded-lg overflow-hidden bg-gray-500/10"
                            >
                                <Image
                                    src={image}
                                    alt={`${productData.name} thumbnail ${index + 1}`}
                                    className="w-full h-auto object-cover mix-blend-multiply"
                                    width={1280}
                                    height={720}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col">
                    {/* Use the new dynamic title */}
                    <h1 className="text-3xl font-medium text-gray-800/90 mb-4">
                        {dynamicTitle}
                    </h1>
                    {/* THIS IS THE MISSING CODE BLOCK 1 */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                            <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <Image
                                className="h-4 w-4"
                                src={assets.star_dull_icon}
                                alt="star_dull_icon"
                            />
                        </div>
                        <p>(4.5)</p>
                    </div>
                    <p className="text-gray-600 mt-3">
                        {productData.description}
                    </p>
                    <p className="text-3xl font-medium mt-6">
                        ${productData.offerPrice}
                        <span className="text-base font-normal text-gray-800/60 line-through ml-2">
                            ${productData.price}
                        </span>
                    </p>
                    <hr className="bg-gray-600 my-6" />
                    {/* END OF MISSING CODE BLOCK 1 */}
                    {/* THIS IS THE MISSING CODE BLOCK 2 */}
                    <div className="overflow-x-auto">
                        <table className="table-auto border-collapse w-full max-w-72">
                            <tbody>
                                <tr>
                                    <td className="text-gray-600 font-medium">Brand</td>
                                    <td className="text-gray-800/50 ">Generic</td>
                                </tr>
                                <tr>
                                    <td className="text-gray-600 font-medium">Color</td>
                                    <td className="text-gray-800/50 ">Multi</td>
                                </tr>
                                <tr>
                                    <td className="text-gray-600 font-medium">Category</td>
                                    <td className="text-gray-800/50">
                                        {productData.category}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* END OF MISSING CODE BLOCK 2 */}

                    {/* This button section was already there */}
                    <div className="flex items-center mt-10 gap-4"></div>
                    <div className="flex items-center mt-10 gap-4">
                        <button onClick={() => addToCart(productData._id)} className="w-full py-3.5 bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition">
                            Add to Cart
                        </button>
                        <button onClick={() => { addToCart(productData._id); router.push('/cart') }} className="w-full py-3.5 bg-orange-500 text-white hover:bg-orange-600 transition">
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center">
                {/* ... (Your featured products section) ... */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
                    {/* Use the featured products from context */}
                    {featuredProducts.map((product, index) => <ProductCard key={index} product={product} />)}
                </div>
                {/* ... */}
            </div>
        </div>
        <Footer />
    </>
    ) : <Loading />
};

export default ProductPageClient;