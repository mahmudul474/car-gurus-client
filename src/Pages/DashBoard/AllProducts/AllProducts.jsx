import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../Shared/Loader/Loader";
import AllProduct from "./AllProduct";
import BookingModal from "../../CategoryProducts/BookingModal";

const AllProducts = () => {
  const [productData, seProductData] = useState(null);
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/products`);
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="mx-20 my-20">
      <div className="mx-5 md:mx-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map((product) => (
          <AllProduct
            key={product._id}
            product={product}
            productData={productData}
            seProductData={seProductData}
          />
        ))}
      </div>
      <div>
        {productData && (
          <BookingModal
            productData={productData}
            seProductData={seProductData}
          />
        )}
      </div>
    </div>
  );
};

export default AllProducts;