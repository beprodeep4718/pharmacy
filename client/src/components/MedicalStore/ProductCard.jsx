import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import Searchbar from "./Searchbar";


const ProductCard = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

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

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };

  if (loading) {
    return <p className="text-center text-lg text-gray-500">Loading product details...</p>;
  }

  if (error) {
    return <p className="text-center text-lg text-red-500">Error: {error}</p>;
  }

  const reviewCounts = [5, 4, 3, 2, 1].map(
    (star) => product.reviews?.filter((r) => r.rating === star).length || 0
  );
  const totalReviews = product.reviews?.length || 0;

  return (
    <div className="container mx-auto p-4">
      <Searchbar />
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-72 h-72 object-cover rounded-lg border border-gray-200"
          />
        </div>

        <div className="w-full md:w-2/3 flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
          <div className="flex items-center gap-4 text-lg font-semibold text-blue-600">
            <span className="line-through text-gray-500">
              ${(product.price * 1.1)?.toFixed(2)}
            </span>
            <span className="text-red-600">10% Off</span>
            <span>${product.price?.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-2 text-lg font-semibold text-blue-600">
            <div className="flex items-center text-yellow-500">
              {[...Array(5)].map((_, index) => (
                <AiFillStar
                  key={index}
                  className={`text-xl ${
                    index < (product.rating || 0) ? "fill-yellow-500" : "fill-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-500 text-sm">({totalReviews} Reviews)</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-blue-600 text-white w-40 h-10 rounded-md font-semibold hover:bg-blue-700">
              Buy Now
            </button>
            <button
              onClick={handleAddToCart}
              className="bg-green-600 text-white w-40 h-10 rounded-md font-semibold hover:bg-green-700"
            >
              Add to Cart
            </button>
          </div>
          <p className="text-green-600 font-semibold">Delivered by Tomorrow</p>
          <div className="flex items-center gap-2 mt-4">
            <label className="font-semibold">Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-16 h-10 border border-gray-300 rounded-md text-center"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 bg-gray-100 p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Product Details</h2>
        <p><strong>Brand:</strong> {product.brand || "N/A"}</p>
        <p><strong>Expires on or After:</strong> {product.expiryDate || "N/A"}</p>
        <p><strong>Country of Origin:</strong> {product.countryOfOrigin || "N/A"}</p>
      </div>

      {product.description && (
        <div className="mt-6 bg-gray-100 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p className="text-gray-600">{product.description}</p>
        </div>
      )}

      <div className="mt-6 bg-gray-100 p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Customer Reviews</h2>
        
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-2/3">
            {totalReviews > 0 ? (
              product.reviews.map((review, index) => (
                <div key={index} className="p-4 border-b border-gray-300">
                  <p className="font-semibold text-gray-800">{review.name}</p>
                  <div className="flex items-center text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <AiFillStar
                        key={i}
                        className={`text-lg ${i < review.rating ? "fill-yellow-500" : "fill-gray-300"}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>

          <div className="w-full lg:w-1/2">
            <h2 className="text-lg font-semibold mb-2">Rating and Reviews</h2>
            {[5, 4, 3, 2, 1].map((star, index) => (
              <div key={index} className="flex items-center gap-1 mb-2">
                <span className="text-gray-700 w-12">{star} ⭐</span>
                <div className="bg-gray-300 w-full h-4 rounded-md relative">
                  <div
                    className="bg-green-500 h-4 rounded-md"
                    style={{ width: `${(reviewCounts[index] / totalReviews) * 100 || 0}%` }}
                  ></div>
                </div>
                <span className="text-gray-700">{reviewCounts[index]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProductCard;
