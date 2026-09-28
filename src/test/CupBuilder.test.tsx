import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CupBuilder } from '../components/CupBuilder';
import { ToastProvider } from '../context/ToastContext';
import { CartProvider } from '../context/CartContext';

describe('CupBuilder Customization Component', () => {
  it('renders step 1 with drink type selections', () => {
    render(
      <ToastProvider>
        <CartProvider>
          <CupBuilder />
        </CartProvider>
      </ToastProvider>
    );

    expect(screen.getByText('Select Drink Foundation')).toBeInTheDocument();
    expect(screen.getByText('Espresso')).toBeInTheDocument();
    expect(screen.getByText('Cappuccino')).toBeInTheDocument();
    expect(screen.getByText('Cold Brew')).toBeInTheDocument();
  });

  it('can navigate through steps and toggle all steps view', () => {
    render(
      <ToastProvider>
        <CartProvider>
          <CupBuilder />
        </CartProvider>
      </ToastProvider>
    );

    // Toggle to view all steps
    const viewAllBtn = screen.getByRole('button', { name: /show all steps/i });
    fireEvent.click(viewAllBtn);

    // Now all steps headings are visible
    expect(screen.getByText('Select Cup Size')).toBeInTheDocument();
    expect(screen.getByText('Select Milk Type')).toBeInTheDocument();
    expect(screen.getByText('Select Coffee Strength')).toBeInTheDocument();
  });
});
