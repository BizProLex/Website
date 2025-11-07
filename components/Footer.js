export default function Footer() {
  return (
    <footer className="border-t border-gold/30 bg-white">
      <div className="container-px mx-auto py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-black/80">© {new Date().getFullYear()} BizProLex Legal. All rights reserved.</p>
        <p className="text-sm text-black/60">UAE • Dubai</p>
      </div>
    </footer>
  );
}
