"use client"

import { useState } from "react"
import Image from "next/image"
import { Star } from "lucide-react"
import { BookingModal } from "@/components/booking-modal"

export function Hero() {
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center">
      <Image
        src="/images/hero-barber.png"
        alt="MJ's Barber Shop interior with classic leather chairs and warm lighting"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1612]/70 via-[#1a1612]/50 to-[#1a1612]/80" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <div className="mb-6 flex items-center justify-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${i < 4 ? "fill-[#d4a853] text-[#d4a853]" : "fill-[#d4a853]/50 text-[#d4a853]/50"}`}
            />
          ))}
          <span className="ml-2 text-sm text-[#c4b99a]">4.6 / 5 from 255 reviews</span>
        </div>

        <h1 className="font-serif text-5xl font-bold leading-tight tracking-tight text-[#f5f0e8] md:text-7xl lg:text-8xl">
          <span className="text-balance">{"MJ's Barber Shop"}</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#c4b99a] md:text-xl">
          Classic cuts, modern styles, and expert grooming in the heart of Napier since day one.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => setBookingOpen(true)}
            className="inline-flex items-center gap-2 bg-[#d4a853] px-8 py-4 text-sm font-semibold uppercase tracking-widest text-[#1a1612] transition-colors hover:bg-[#c49a43]"
          >
            Book Now
          </button>
          <a
            href="#services"
            className="inline-flex items-center gap-2 border border-[#c4b99a]/30 px-8 py-4 text-sm font-semibold uppercase tracking-widest text-[#c4b99a] transition-colors hover:border-[#d4a853] hover:text-[#d4a853]"
          >
            Our Services
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-[#c4b99a]/60">Scroll</span>
          <div className="h-8 w-px bg-[#c4b99a]/30" />
        </div>
      </div>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </section>
  )
}
