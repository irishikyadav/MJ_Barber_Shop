import Image from "next/image"

export function About() {
  return (
    <section id="about" className="bg-[#f5f0e8] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/about-shop.jpg"
                alt="Barber performing a classic straight razor shave"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden bg-[#d4a853] p-6 lg:block">
              <span className="block font-serif text-4xl font-bold text-[#1a1612]">255+</span>
              <span className="text-xs uppercase tracking-widest text-[#1a1612]/70">
                Happy Customers
              </span>
            </div>
          </div>

          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#d4a853]">Our Story</span>
            <h2 className="mt-4 font-serif text-4xl font-bold text-[#1a1612] md:text-5xl">
              <span className="text-balance">A Cut Above the Rest</span>
            </h2>
            <div className="mt-4 h-px w-16 bg-[#d4a853]" />

            <p className="mt-8 text-base leading-relaxed text-[#4a4035]">
              {"Located inside the historic Old County Hotel on Emerson Street, MJ's Barber Shop is Napier's go-to destination for quality grooming. We combine traditional barbering techniques with modern styles to give you the perfect look every time."}
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#4a4035]">
              Whether you need a classic cut, a fresh beard trim, or the full hot-towel shave experience, our skilled barbers take the time to understand exactly what you want. Step in, relax, and leave looking your best.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-6">
              <div>
                <span className="font-serif text-3xl font-bold text-[#1a1612]">4.6</span>
                <span className="mt-1 block text-xs uppercase tracking-widest text-[#8a8070]">
                  Star Rating
                </span>
              </div>
              <div>
                <span className="font-serif text-3xl font-bold text-[#1a1612]">255+</span>
                <span className="mt-1 block text-xs uppercase tracking-widest text-[#8a8070]">
                  Reviews
                </span>
              </div>
              <div>
                <span className="font-serif text-3xl font-bold text-[#1a1612]">15-45</span>
                <span className="mt-1 block text-xs uppercase tracking-widest text-[#8a8070]">
                  Min Visit
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
