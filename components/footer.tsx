import { Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#1a1612] py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <span className="font-serif text-2xl font-bold text-[#d4a853]">{"MJ's"}</span>
            <span className="ml-1 text-xs uppercase tracking-[0.3em] text-[#c4b99a]">
              Barber Shop
            </span>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#8a8070]">
              Classic cuts, modern styles, and expert grooming in the heart of Napier. Located in
              the historic Old County Hotel.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#d4a853]">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-3">
              {["Home", "Services", "About", "Reviews", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm text-[#8a8070] transition-colors hover:text-[#c4b99a]"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#d4a853]">
              Contact Info
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="tel:068354580"
                className="flex items-center gap-2 text-sm text-[#8a8070] transition-colors hover:text-[#c4b99a]"
              >
                <Phone className="h-4 w-4" />
                06 835 4580
              </a>
              <a
                href="https://maps.google.com/?q=212+Emerson+Street+Napier+4110"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#8a8070] transition-colors hover:text-[#c4b99a]"
              >
                <MapPin className="h-4 w-4" />
                212 Emerson Street, Napier 4110
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[#2a2420] pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-[#8a8070]">
              {"MJ's Barber Shop. All rights reserved."}
            </p>
            <p className="text-xs text-[#8a8070]">
              Located in: Old County Hotel, Napier South
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
