import React, { useEffect, useState } from "react";
import { fetchBreeds, fetchProducts, fetchBlogs } from "../services/api";
import Header from "../components/Client/Header"; // Updated import path
import MainSection from "../components/Client/MainSection";
import DogBreedSection from "../components/Client/DogBreedSection"; // Updated import path
import PetProductSection from "../components/Client/PetProductSection"; // Updated import path
import BlogSection from "../components/Client/BlogSection"; // Updated import path
import Footer from "../components/Client/Footer"; // Updated import path
import NewsSection from "../components/Client/NewsSection.js";

const LandingPage = () => {
  const [breeds, setBreeds] = useState([]);
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const breedsData = await fetchBreeds();
        setBreeds(breedsData);

        const productsData = await fetchProducts();
        setProducts(productsData);

        const blogsData = await fetchBlogs();
        setBlogs(blogsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <MainSection />
      <DogBreedSection breeds={breeds} />
      <PetProductSection products={products} />
      <BlogSection blogs={blogs} />
      <NewsSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
