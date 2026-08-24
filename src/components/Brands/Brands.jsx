import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import './Brands.css';

export function Brands({ portfolio }) {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const loopLogos = useMemo(() => portfolio.brandLogos.map(brand => ({
    src: brand.src,
    alt: brand.name,
    title: brand.name
  })), [portfolio.brandLogos]);

  const updateScrollState = () => {
    const container = carouselRef.current;
    if (!container) return;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    updateScrollState();
    window.addEventListener('resize', updateScrollState);
    return () => window.removeEventListener('resize', updateScrollState);
  }, [loopLogos]);

  const scrollBrands = direction => {
    const container = carouselRef.current;
    if (!container) return;
    const amount = Math.max(320, Math.floor(container.clientWidth * 0.85));
    container.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
    window.setTimeout(updateScrollState, 250);
  };

  return (
    <section className="brand-logos section" aria-label="Brands I have worked with">
      <div className="section-title brand-logos-header">
        <h2>BRANDS I WORKED WITH</h2>
      </div>
      <div className="brand-logos-container">
        <button
          type="button"
          className="brand-carousel-button brand-carousel-button--left"
          onClick={() => scrollBrands('left')}
          disabled={!canScrollLeft}
          aria-label="Scroll brand logos left"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="brand-carousel" ref={carouselRef} onScroll={updateScrollState} aria-label="Partner brand logos">
          <div className="brand-carousel-track">
            {loopLogos.map(item => (
              <div className="brand-loop-item-custom" key={item.title} title={item.title}>
                <img
                  src={item.src}
                  alt={item.alt}
                  draggable={false}
                  onError={e => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="brand-carousel-button brand-carousel-button--right"
          onClick={() => scrollBrands('right')}
          disabled={!canScrollRight}
          aria-label="Scroll brand logos right"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
