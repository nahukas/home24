import React from 'react';
import { Category } from '../types';

interface SidebarProps {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ categories, loading, error }) => {
  const renderCategories = () => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!categories.length) return <div>No categories found</div>;

    return (
      <ul>
        {categories[0].childrenCategories.list.map(({ name, urlPath }) => (
          <li key={urlPath}>
            <a href={`/${urlPath}`}>{name}</a>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <aside className='sidebar'>
      <h3>Kategorien</h3>
      {renderCategories()}
    </aside>
  );
};

export default Sidebar;
