import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

describe('Layout Components', () => {
    describe('Header', () => {
        it('renders logo and menu button', () => {
            render(<Header />);
            expect(screen.getByLabelText('Home')).toBeInTheDocument();
            expect(screen.getByLabelText('Menu')).toBeInTheDocument();
        });
    });

    describe('Footer', () => {
        it('renders navigation links', () => {
            render(<Footer />);
            const links = ['Home', 'Services', 'Projects', 'Investors', 'Contact'];
            links.forEach(link => {
                // There might be multiple elements with the same text (e.g., "Contact" in nav and footer details)
                const elements = screen.getAllByText(link);
                expect(elements.length).toBeGreaterThan(0);
                expect(elements[0]).toBeInTheDocument();
            });
        });

        it('renders contact info', () => {
            render(<Footer />);
            expect(screen.getByText('info@hhconstruction.com')).toBeInTheDocument();
            expect(screen.getByText(/London-Middlesex/)).toBeInTheDocument();
        });

        it('renders back to top button', () => {
            render(<Footer />);
            expect(screen.getByText(/Back to top/i)).toBeInTheDocument();
        });
    });
});
