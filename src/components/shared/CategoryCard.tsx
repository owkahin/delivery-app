import { FC } from 'react';

interface CategoryCardProps {
  name: string;
  icon: JSX.Element;
}

const CategoryCard: FC<CategoryCardProps> = ({ name, icon }) => {
  return (
    <div className="bg-[var(--white)] shadow-md rounded-md p-4 flex flex-col items-center justify-center min-w-[120px]">
      {<span className="text-[var(--primary-brand-yellow)]">{icon}</span>}
      <p className="mt-2 text-center text-[var(--black)]">{name}</p>
    </div>
  );
};

export default CategoryCard;
