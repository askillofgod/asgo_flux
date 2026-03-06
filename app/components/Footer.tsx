export function Footer() {
  return (
    <footer className="w-full border-t border-black/10 bg-[#fafaf9]">
      <div className="w-full px-4 py-16 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <div className="grid w-full gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-black/60">discover</p>
            <div className="mt-4 flex flex-col gap-1 text-sm text-black/80">
              <a href="/#about">about</a>
              <a href="/#studio">our vision</a>
              <a href="/#work">work</a>
              <a href="/#service">service</a>
              <a href="/#lets-talk">let&apos;s talk</a>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-black/60">follow</p>
            <div className="mt-4 flex gap-6 text-sm text-black/80">
              <a href="https://instagram.com/asogflux" target="_blank" rel="noopener noreferrer">instagram</a>
            </div>
            <p className="mt-8 text-sm text-black/60">©2024 AsogFLUX</p>
            <p className="text-sm text-black/60">ALL RIGHTS RESERVED</p>
            <div className="mt-4 flex gap-6 text-xs text-black/50">
              <a href="/privacy-policy">privacy policy</a>
              <a href="/terms">terms of use</a>
            </div>
            <a href="#top" className="mt-6 inline-block text-xs uppercase tracking-wider text-black/60 hover:text-black">
              back to top
            </a>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-black/60">service</p>
            <div className="mt-4 flex flex-col gap-1 text-sm text-black/80">
              <a href="/#service">Brand Design</a>
              <a href="/#service">Digital Experience</a>
              <a href="/#service">Design System</a>
              <a href="/#service">Content &amp; Visual</a>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-black/60">AsogFLUX</p>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-black/60">contact</p>
            <a href="mailto:momopick.global@gmail.com" className="mt-2 block text-sm text-black/80">momopick.global@gmail.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
