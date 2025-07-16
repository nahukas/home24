import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../../styles/theme';
import CartSummary from '../CartSummary';
import { CartProvider, useCart } from '../../context/cartContext';

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
    render(
      <ThemeProvider theme={theme}>
        <CartProvider>
          <CartSummary />
        </CartProvider>
      </ThemeProvider>
    );

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('displays "Cart is empty" when cart is empty', () => {
    mockUseCart.mockReturnValue({ ...mockCartContext, cartItems: [] });

    render(
      <ThemeProvider theme={theme}>
        <CartProvider>
          <CartSummary />
        </CartProvider>
      </ThemeProvider>
    );

    fireEvent.click(screen.getByTestId('cart-icon'));
    expect(screen.getByText('Cart is empty')).toBeInTheDocument();
  });

  test('formats prices with two decimals in dropdown', () => {
    render(
      <ThemeProvider theme={theme}>
        <CartProvider>
          <CartSummary />
        </CartProvider>
      </ThemeProvider>
    );

    fireEvent.click(screen.getByTestId('cart-icon'));
    expect(screen.getByText('101,00 €')).toBeInTheDocument();
    expect(screen.getByText('100,00 €')).toBeInTheDocument();
  });

  test('calls incrementItem when "+" button is clicked', () => {
    render(
      <ThemeProvider theme={theme}>
        <CartProvider>
          <CartSummary />
        </CartProvider>
      </ThemeProvider>
    );

    fireEvent.click(screen.getByTestId('cart-icon'));
    const incrementButton = screen.getAllByText('+')[0];
    fireEvent.click(incrementButton);
    expect(mockCartContext.incrementItem).toHaveBeenCalledWith('1');
  });

  test('calls decrementItem when "-" button is clicked', () => {
    render(
      <ThemeProvider theme={theme}>
        <CartProvider>
          <CartSummary />
        </CartProvider>
      </ThemeProvider>
    );

    fireEvent.click(screen.getByTestId('cart-icon'));
    const decrementButton = screen.getAllByText('-')[0];
    fireEvent.click(decrementButton);
    expect(mockCartContext.decrementItem).toHaveBeenCalledWith('1');
  });

  test('calls removeFromCart when trash icon is clicked', () => {
    render(
      <ThemeProvider theme={theme}>
        <CartProvider>
          <CartSummary />
        </CartProvider>
      </ThemeProvider>
    );

    fireEvent.click(screen.getByTestId('cart-icon'));
    const trashButton = screen.getByTestId('trash-icon-1');
    fireEvent.click(trashButton);
    expect(mockCartContext.removeFromCart).toHaveBeenCalledWith('1');
  });

  test('calls clearCart when "Clear Cart" button is clicked', () => {
    render(
      <ThemeProvider theme={theme}>
        <CartProvider>
          <CartSummary />
        </CartProvider>
      </ThemeProvider>
    );

    fireEvent.click(screen.getByTestId('cart-icon'));
    fireEvent.click(screen.getByText('Clear Cart'));
    expect(mockCartContext.clearCart).toHaveBeenCalled();
  });

  test('toggles dropdown when cart icon is clicked', () => {
    render(
      <ThemeProvider theme={theme}>
        <CartProvider>
          <CartSummary />
        </CartProvider>
      </ThemeProvider>
    );

    const cartIcon = screen.getByTestId('cart-icon');
    expect(screen.queryByText('Tisch (x2)')).not.toBeInTheDocument();

    fireEvent.click(cartIcon);
    expect(screen.getByText('Tisch (x2)')).toBeInTheDocument();

    fireEvent.click(cartIcon);
    expect(screen.queryByText('Tisch (x2)')).not.toBeInTheDocument();
  });

  test('renders empty cart without dropdown initially', () => {
    mockUseCart.mockReturnValue({ ...mockCartContext, cartItems: [] });

    render(
      <ThemeProvider theme={theme}>
        <CartProvider>
          <CartSummary />
        </CartProvider>
      </ThemeProvider>
    );

    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.queryByText('Cart is empty')).not.toBeInTheDocument();
  });
});
