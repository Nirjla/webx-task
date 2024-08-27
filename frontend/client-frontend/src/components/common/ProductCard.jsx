import { Link } from "react-router-dom";
import CardWrapper from "../wrapper/CardWrapper";
import SecondaryButton from "./SecondaryButton";

export default function ProductCard({ products }) {
      return (<>
            {products?.map((product) => (
                  <CardWrapper key={product._id}>
                        <Link to={`/products/${product._id}`}>
                              <img src={product.image.url} alt={product.name} className="w-full h-40 object-contain" />
                        </Link>
                        <div className="p-4">
                              <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">{product.name}</h3>
                              <p className="text-gray-600 mt-1 line-clamp-2">{product.description}</p>
                              <p className="text-gray-900 font-bold text-sm mt-2">Rs {product.price.toFixed(2)}</p>
                              <SecondaryButton title={'Add to Cart'} onClick={() => handleAddToCart(product)}
                              />
                        </div>
                  </CardWrapper>
            ))}
      </>)
}