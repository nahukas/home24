import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../cartContext';
import { CartItem } from '../../types';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('CartContext', () => {
  const mockItem: CartItem = {
    id: '1',
    name: 'Tisch',
    price: 50.5,
    quantity: 1
  };
  const mockItem2: CartItem = {
    id: '2',
    name: 'Stuhl',
    price: 100,
    quantity: 1
  };

  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  test('initializes cartItems from localStorage', () => {
    const savedCart = JSON.stringify([mockItem]);
    localStorageMock.getItem.mockReturnValue(savedCart);

    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider
    });

    expect(result.current.cartItems).toEqual([mockItem]);
    expect(localStorageMock.getItem).toHaveBeenCalledWith('cart');
  });

  test('initializes cartItems as empty array if localStorage is empty', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider
    });

    expect(result.current.cartItems).toEqual([]);
    expect(localStorageMock.getItem).toHaveBeenCalledWith('cart');
  });

  test('addToCart adds a new item to the cart', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider
    });

    act(() => {
      result.current.addToCart(mockItem);
    });

    expect(result.current.cartItems).toEqual([mockItem]);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'cart',
      JSON.stringify([mockItem])
    );
  });

  test('addToCart increments quantity of existing item', () => {
    const initialCart = [{ ...mockItem, quantity: 1 }];
    localStorageMock.getItem.mockReturnValue(JSON.stringify(initialCart));

    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider
    });

    act(() => {
      result.current.addToCart(mockItem);
    });

    expect(result.current.cartItems).toEqual([{ ...mockItem, quantity: 2 }]);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'cart',
      JSON.stringify([{ ...mockItem, quantity: 2 }])
    );
  });

  test('removeFromCart removes an item by id', () => {
    const initialCart = [mockItem, mockItem2];
    localStorageMock.getItem.mockReturnValue(JSON.stringify(initialCart));

    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider
    });

    act(() => {
      result.current.removeFromCart('1');
    });

    expect(result.current.cartItems).toEqual([mockItem2]);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'cart',
      JSON.stringify([mockItem2])
    );
  });

  test('clearCart empties the cart', () => {
    const initialCart = [mockItem, mockItem2];
    localStorageMock.getItem.mockReturnValue(JSON.stringify(initialCart));

    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider
    });

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.cartItems).toEqual([]);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'cart',
      JSON.stringify([])
    );
  });

  test('incrementItem increases quantity of an item', () => {
    const initialCart = [{ ...mockItem, quantity: 1 }];
    localStorageMock.getItem.mockReturnValue(JSON.stringify(initialCart));

    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider
    });

    act(() => {
      result.current.incrementItem('1');
    });

    expect(result.current.cartItems).toEqual([{ ...mockItem, quantity: 2 }]);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'cart',
      JSON.stringify([{ ...mockItem, quantity: 2 }])
    );
  });

  test('decrementItem decreases quantity of an item', () => {
    const initialCart = [{ ...mockItem, quantity: 2 }];
    localStorageMock.getItem.mockReturnValue(JSON.stringify(initialCart));

    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider
    });

    act(() => {
      result.current.decrementItem('1');
    });

    expect(result.current.cartItems).toEqual([{ ...mockItem, quantity: 1 }]);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'cart',
      JSON.stringify([{ ...mockItem, quantity: 1 }])
    );
  });

  test('decrementItem removes item if quantity reaches 0', () => {
    const initialCart = [{ ...mockItem, quantity: 1 }];
    localStorageMock.getItem.mockReturnValue(JSON.stringify(initialCart));

    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider
    });

    act(() => {
      result.current.decrementItem('1');
    });

    expect(result.current.cartItems).toEqual([]);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'cart',
      JSON.stringify([])
    );
  });

  test('useCart throws error when used outside CartProvider', () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    expect(() => renderHook(() => useCart())).toThrow(
      'useCart must be used within a CartProvider'
    );
    consoleError.mockRestore();
  });
});
