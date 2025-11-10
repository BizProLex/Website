export default function Section({ id, title, children, className = '', titleClassName = '' }) {
  return (
    <section id={id} className={`py-12 md:py-16 ${className}`}>
      <div className="container-px mx-auto max-w-6xl">
        {title && (
          <h2 className={`font-playfair text-3xl sm:text-4xl text-black animate-fade-in ${titleClassName}`}>
            {title}
          </h2>
        )}
        <div className={title ? 'mt-6 animate-fade-in-delay' : ''}>
          {children}
        </div>
      </div>
    </section>
  );
}
