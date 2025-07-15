import { render, screen } from '@testing-library/react';
import Sidebar from '../Sidebar';
import { Category } from '../../types';

describe('Sidebar', () => {
  const mockCategories: Category[] = [
    {
      name: 'Furniture',
      articleCount: 50,
      childrenCategories: {
        list: [
          { name: 'Chairs', urlPath: 'chairs' },
          { name: 'Tables', urlPath: 'tables' }
        ]
      },
      categoryArticles: { articles: [] }
    }
  ];

  it('renders loading state', () => {
    render(<Sidebar categories={[]} loading={true} error={null} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    render(<Sidebar categories={[]} loading={false} error='Failed to fetch' />);
    expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument();
  });

  it('renders no categories found when categories are empty', () => {
    render(<Sidebar categories={[]} loading={false} error={null} />);
    expect(screen.getByText('No categories found')).toBeInTheDocument();
  });

  it('renders category links when categories are provided', () => {
    render(
      <Sidebar categories={mockCategories} loading={false} error={null} />
    );

    expect(screen.getByText('Kategorien')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Chairs' })).toHaveAttribute(
      'href',
      '/chairs'
    );
    expect(screen.getByRole('link', { name: 'Tables' })).toHaveAttribute(
      'href',
      '/tables'
    );
  });
});
