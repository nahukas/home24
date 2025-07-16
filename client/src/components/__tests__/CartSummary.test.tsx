import { fireEvent, screen } from '@testing-library/react';

import { useCart } from '../../context/cartContext';
import { renderWithProviders } from '../../test/utils/renderWithProviders';
import CartSummary from '../CartSummary';

jest.mock('../../context/cartContext', () => ({
  useCart: jest.fn(),
  CartProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  )
}));

const mockUseCart = useCart as jest.Mock;

describe('CartSummary', () => {
  const mockCartItems = [
    { id: '1', name: 'Tisch', price: 50.5, quantity: 2 },
    { id: '2', name: 'Stuhl', price: 100, quantity: 1 }
  ];

  const mockCartContext = {
    cartItems: mockCartItems,
    addToCart: jest.fn(),
    removeFromCart: jest.fn(),
    clearCart: jest.fn(),
    incrementItem: jest.fn(),
    decrementItem: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseCart.mockReturnValue(mockCartContext);
  });

  test('displays correct total quantity in cart count', () => {
    renderWithProviders(<CartSummary />);

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('displays "Cart is empty" when cart is empty', () => {
    mockUseCart.mockReturnValue({ ...mockCartContext, cartItems: [] });
    renderWithProviders(<CartSummary />);

    fireEvent.click(screen.getByTestId('cart-icon'));
    expect(screen.getByText('Cart is empty')).toBeInTheDocument();
  });

  test('formats prices with two decimals in dropdown', () => {
    renderWithProviders(<CartSummary />);

    fireEvent.click(screen.getByTestId('cart-icon'));
    expect(screen.getByText('101,00 €')).toBeInTheDocument();
    expect(screen.getByText('100,00 €')).toBeInTheDocument();
  });

  test('calls incrementItem when "+" button is clicked', () => {
    renderWithProviders(<CartSummary />);

    fireEvent.click(screen.getByTestId('cart-icon'));
    const incrementButton = screen.getAllByText('+')[0];
    fireEvent.click(incrementButton);
    expect(mockCartContext.incrementItem).toHaveBeenCalledWith('1');
  });

  test('calls decrementItem when "-" button is clicked', () => {
    renderWithProviders(<CartSummary />);

    fireEvent.click(screen.getByTestId('cart-icon'));
    const decrementButton = screen.getAllByText('-')[0];
    fireEvent.click(decrementButton);
    expect(mockCartContext.decrementItem).toHaveBeenCalledWith('1');
  });

  test('calls removeFromCart when trash icon is clicked', () => {
    renderWithProviders(<CartSummary />);

    fireEvent.click(screen.getByTestId('cart-icon'));
    const trashButton = screen.getByTestId('trash-icon-1');
    fireEvent.click(trashButton);
    expect(mockCartContext.removeFromCart).toHaveBeenCalledWith('1');
  });

  test('calls clearCart when "Clear Cart" button is clicked', () => {
    renderWithProviders(<CartSummary />);

    fireEvent.click(screen.getByTestId('cart-icon'));
    fireEvent.click(screen.getByText('Clear Cart'));
    expect(mockCartContext.clearCart).toHaveBeenCalled();
  });

  test('toggles dropdown when cart icon is clicked', () => {
    renderWithProviders(<CartSummary />);

    const cartIcon = screen.getByTestId('cart-icon');
    expect(screen.queryByText('Tisch (x2)')).not.toBeInTheDocument();

    fireEvent.click(cartIcon);
    expect(screen.getByText('Tisch (x2)')).toBeInTheDocument();

    fireEvent.click(cartIcon);
    expect(screen.queryByText('Tisch (x2)')).not.toBeInTheDocument();
  });

  test('renders empty cart without dropdown initially', () => {
    mockUseCart.mockReturnValue({ ...mockCartContext, cartItems: [] });
    renderWithProviders(<CartSummary />);

    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.queryByText('Cart is empty')).not.toBeInTheDocument();
  });
});
