import React from 'react';
import { render, screen } from '@testing-library/react';
import App from "./App";

test('renders navbar', () => {
    render(<App />);
    const linkElement = screen.getByTestId("navbar");
    expect(linkElement).toBeInTheDocument();
});

test('renders home page', () => {
    render(<App />);
    const linkElement = screen.getByTestId("home-page");
    expect(linkElement).toBeInTheDocument();
});

test('renders footer', () => {
    render(<App />);
    const linkElement = screen.getByTestId("footer");
    expect(linkElement).toBeInTheDocument();
});
