// src/components/ui/ProductCard.tsx
import { Button } from '@/components/ui/button';
import { Card, CardFooter } from '@/components/ui/card';
import { IProduct } from '@/types/product';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="">
      <Link to={`/detail/${product.id}`}>
        <Card className="w-[241px] h-[410px] bg-[#212121] border-none">
          {product.images.slice(0, 1).map((image) => (
            <img
              src={image.imageUrl}
              alt="img product"
              className="rounded-lg w-[241px] h-[320px] object-cover"
            />
          ))}
          <CardFooter>
            <div className="flex-col gap-2 py-1 h-0">
              <h3 className="text-red-500 text-[15px] font-semibold">
                {product.product_name}
              </h3>
              <p className="text-white text-[14px]">{product.price}</p>
              <p className="text-red-500 text-[14px]">{product.stock}</p>
            </div>
          </CardFooter>
        </Card>
      </Link>
      <Button className="bg-red-500 w-full mt-2">Add To Chart</Button>
    </div>
  );
};

export default ProductCard;
