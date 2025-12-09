import { FC } from 'react';
import { Button } from '@/components/ui/button';

interface FeaturedItemCardProps {
  name: string;
  price: string;
  image: string;
}

const FeaturedItemCard: FC<FeaturedItemCardProps> = ({ name, price, image }) => {
  return (
    <div className="bg-[var(--white)] shadow-md rounded-md p-4">
      <div
        className="bg-gray-200 h-40 rounded-md mb-4"
        style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' }}
      ></div>
      <h3 className="text-lg font-bold mb-2 text-[var(--black)]">{name}</h3>
      <p className="text-[var(--gray)]">{price}</p>
      <Button className="mt-4 w-full bg-gradient-to-r from-[var(--primary-brand-yellow)] to-[var(--accent-bright-yellow)] text-[var(--black)] font-bold">Add to Cart</Button>
    </div>
  );
};

export default FeaturedItemCard;
