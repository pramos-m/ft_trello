import { useState } from 'react';
import { Star, Trash2 } from 'lucide-react';
import DropdownMenu from '../common/DropDownMenu';

export default function BoardHeaderMenu() {
  const [isFavorite, setIsFavorite] = useState(false);
  
  const menuItems = [
    {
      icon: <Star size={16} className={isFavorite ? "fill-current text-yellow-400" : ""} />,
      label: "Favourite",
      onClick: () => setIsFavorite(!isFavorite)
    },
    {
      icon: <Trash2 size={16} />,
      label: "Delete",
      onClick: () => {/* Add delete functionality */}
    }
  ];

  return (
    <div className="border-b border-neutral-200 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">My Board</h1>
        <DropdownMenu items={menuItems} />
      </div>
    </div>
  );
}

