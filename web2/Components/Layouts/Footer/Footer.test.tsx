import { render, screen } from '@testing-library/react';

import { Footer } from './Footer';

describe('Footer', () => {
  const sections = [
    {
      title: 'Product',
      col: 1,
      links: [{ text: 'Demo', href: '/demo' }]
    },
    {
      title: 'Solutions',
      col: 2,
      links: [{ text: 'Enhance Performance', href: '/solutions/enhance-performance' }]
    },
    {
      title: 'Developers',
      col: 3,
      links: [{ text: 'Getting started', href: '/documentation/first-steps' }]
    },
    {
      title: 'Reports',
      col: 4,
      links: [{ text: 'Metrics', href: '/metrics' }]
    },
    {
      title: 'Support',
      col: 5,
      links: [{ text: 'MediaManager us', href: '/about' }]
    }
  ];

  it('Media component should render expected links', async () => {
    render(<Footer />);
    sections.forEach((section) => {
      const sectionDom = screen.getByText(section.title);
      expect(sectionDom).toHaveTextContent(section.title);
      section.links.forEach((link) => {
        const linkDom = screen.getByText(link.text);
        expect(linkDom).toHaveAttribute('href', link.href);
      });
    });
  });
});
