export default function Hero({ onLearnMore }) {
  return (
    <section
      className="relative h-[calc(100vh-4rem)] w-full overflow-hidden bg-center bg-cover"
      style={{ backgroundImage: 'url(/LANDING-PAGE-BG.jpg)' }}
      id="home"
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col items-center justify-center text-center px-6">
        <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl text-white animate-fade-in">
          BizProLex Legal
        </h1>

        <p className="mt-4 max-w-2xl text-white/90 text-lg sm:text-xl animate-fade-in-delay">
          Specialised Legal Consultancy in the UAE
        </p>

        <div className="mt-10 animate-fade-in-delay-2">
          <button
            onClick={onLearnMore}
            className="rounded-md bg-gold px-6 py-3 font-medium text-black shadow-sm hover:shadow-lg transition-shadow"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
