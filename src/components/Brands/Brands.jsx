import LogoLoop from '../UI/LogoLoop/LogoLoop';
import './Brands.css';

export function Brands({ portfolio }) {
  // Map brandLogos to the format expected by LogoLoop
  const loopLogos = portfolio.brandLogos.map(brand => ({
    src: brand.src,
    alt: brand.name,
    title: brand.name
  }));

  return (
    <section className="brand-logos section" aria-label="Brands I have worked with">
      <div className="section-title brand-logos-header">
        <h2>BRANDS I WORKED WITH</h2>
      </div>
      <div className="brand-logos-container">
        <LogoLoop
          logos={loopLogos}
          speed={40}
          direction="left"
          logoHeight={50}
          gap={60}
          hoverSpeed={10}
          scaleOnHover
          fadeOut
          fadeOutColor="var(--butter-bg, #FAFAFA)"
          ariaLabel="Partner brand logos"
          renderItem={(item) => (
            <div className="brand-loop-item-custom">
              <img
                src={item.src}
                alt={item.alt}
                draggable={false}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="brand-tooltip">{item.title}</span>
            </div>
          )}
        />
      </div>
    </section>
  );
}
