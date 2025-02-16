import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import Searchbar from "./Searchbar";

const ProductCard = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="text-center text-lg text-gray-500">Loading product details...</p>;
  }

  if (error) {
    return <p className="text-center text-lg text-red-500">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <Searchbar />

      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row gap-6">
        {/* Product Image */}
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-72 h-72 object-cover rounded-lg border border-gray-200"
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-2/3 flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>

          {/* Price & Rating */}
          <div className="flex items-center gap-2 text-lg font-semibold text-blue-600">
            ${product.price?.toFixed(2)}
            <div className="flex items-center text-yellow-500">
              {[...Array(5)].map((_, index) => (
                <AiFillStar key={index} className={`text-xl ${index < (product.rating || 0) ? "fill-yellow-500" : "fill-gray-300"}`} />
              ))}
            </div>
            <span className="text-gray-500 text-sm">({product.reviews?.length || 0} Reviews)</span>
          </div>

          {/* Buy Button */}
          <button className="bg-blue-600 text-white w-40 h-10 rounded-md font-semibold hover:bg-blue-700">
            Buy Now
          </button>

          {/* Product Info */}
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Product Details</h2>
            <p><strong>Brand:</strong> {product.brand || "N/A"}</p>
            <p><strong>Expires on or After:</strong> {product.expiryDate || "N/A"}</p>
            <p><strong>Country of Origin:</strong> {product.countryOfOrigin || "N/A"}</p>
          </div>

          {/* Description */}
          {product.description && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>
          )}

          {/* Uses */}
          {product.uses && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">Uses</h2>
              <p className="text-gray-600">{product.uses}</p>
            </div>
          )}

          {/* Directions for Use */}
          {product.directions && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">Directions for Use</h2>
              <p className="text-gray-600">{product.directions}</p>
            </div>
          )}

          {/* Quick Tips */}
          {product.quickTips && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">Quick Tips</h2>
              <p className="text-gray-600">{product.quickTips}</p>
            </div>
          )}

          {/* Side Effects */}
          {product.sideEffects && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">Side Effects</h2>
              <p className="text-gray-600">{product.sideEffects}</p>
            </div>
          )}

          {/* Customer Reviews */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Customer Reviews</h2>
            {product.reviews?.length > 0 ? (
              product.reviews.map((review, index) => (
                <div key={index} className="p-4 border-b border-gray-300">
                  <p className="font-semibold text-gray-800">{review.name}</p>
                  <div className="flex items-center text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <AiFillStar key={i} className={`text-lg ${i < review.rating ? "fill-yellow-500" : "fill-gray-300"}`} />
                    ))}
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
