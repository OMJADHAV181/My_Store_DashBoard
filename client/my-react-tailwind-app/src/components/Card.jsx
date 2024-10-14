import React from 'react';

const Card = ({ items }) => {
  return (
    <div className="min-w-full">
      <table className="min-w-full bg-yellow-400 border border-black">
        <thead>
          <tr>
            {["ID", "Title", "Description", "Price", "Category", "Sold", "Image"].map((header) => (
              <th key={header} className="py-2 px-4 border border-black">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.slice(0, 10).map((item) => (
            <tr key={item.Id} className="text-center">
              <td className="py-2 px-4 border border-black">{item.Id || '-'}</td>
              <td className="py-2 px-4 border border-black">{item.title || '-'}</td>
              <td className="py-2 px-4 border border-black">{String(item.Description).substring(0,50) || '-'}</td>
              <td className="py-2 px-4 border border-black">{item.Price || '-'}</td>
              <td className="py-2 px-4 border border-black">{item.Category || '-'}</td>
              <td className="py-2 px-4 border border-black">{item.Sold ? 'Yes' : 'No'}</td>
              <td className="py-2 px-4 border border-black">
                {item.Image ? (
                  <img src={item.Image} alt={item.title} className="w-16 h-16 object-cover" />
                ) : (
                  '-'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Card;