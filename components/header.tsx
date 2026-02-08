"use client"

import { useState } from "react"
import { Menu, X, Phone, MapPin, Calendar } from "lucide-react"
import { BookingModal } from "@/components/booking-modal"

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1612]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#home" className="flex flex-col">
          <span className="font-serif text-2xl font-bold tracking-wide text-[#d4a853]">
            {"MJ's"}
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#c4b99a]">
            Barber Shop
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm uppercase tracking-widest text-[#c4b99a] transition-colors hover:text-[#d4a853]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href="tel:068354580"
            className="flex items-center gap-2 text-sm text-[#c4b99a] transition-colors hover:text-[#d4a853]"
          >
            <Phone className="h-4 w-4" />
            06 835 4580
          </a>
          <button
            type="button"
            onClick={() => setBookingOpen(true)}
            className="flex items-center gap-2 bg-[#d4a853] px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#1a1612] transition-colors hover:bg-[#c49a43]"
          >
            <Calendar className="h-3.5 w-3.5" />
            Book Now
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-[#c4b99a] md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-[#2a2420] bg-[#1a1612] px-6 py-6 md:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm uppercase tracking-widest text-[#c4b99a] transition-colors hover:text-[#d4a853]"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-3 border-t border-[#2a2420] pt-6">
            <a href="tel:068354580" className="flex items-center gap-2 text-sm text-[#c4b99a]">
              <Phone className="h-4 w-4" />
              06 835 4580
            </a>
            <a
              href="https://maps.google.com/?q=212+Emerson+Street+Napier+4110"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[#c4b99a]"
            >
              <MapPin className="h-4 w-4" />
              212 Emerson Street, Napier
            </a>
          </div>
        </div>
      )}
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </header>
  )
}
