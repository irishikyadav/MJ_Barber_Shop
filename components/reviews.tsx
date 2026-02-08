"use client"

import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

const reviews = [
  {
    name: "James W.",
    rating: 5,
    text: "Best barber in Napier, hands down. Always leave looking sharp and feeling great. The hot towel shave is an experience everyone should try.",
  },
  {
    name: "Sarah M.",
    rating: 5,
    text: "Took my son here for his first proper haircut. The barbers were patient, friendly, and did an amazing job. We'll be back for sure.",
  },
  {
    name: "David L.",
    rating: 5,
    text: "Consistent quality every single time. Great atmosphere in the old hotel building too. Wouldn't go anywhere else in Hawke's Bay.",
  },
  {
    name: "Tom R.",
    rating: 4,
    text: "Really good cuts at fair prices. The beard trim was exactly what I wanted. Location inside the Old County Hotel is pretty cool too.",
  },
  {
    name: "Mike H.",
    rating: 5,
    text: "Professional service from start to finish. They take the time to listen to what you want and deliver every time. Highly recommend.",
  },
  {
    name: "Chris B.",
    rating: 5,
    text: "Found this place when visiting Napier and wish I had one like it back home. Excellent attention to detail and great conversation.",
  },
]

export function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const visibleCount = 3

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }
  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const getVisibleReviews = () => {
    const visible = []
    for (let i = 0; i < visibleCount; i++) {
      visible.push(reviews[(currentIndex + i) % reviews.length])
    }
    return visible
  }

  return (
    <section id="reviews" className="bg-[#1a1612] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#d4a853]">
              Testimonials
            </span>
            <h2 className="mt-4 font-serif text-4xl font-bold text-[#f5f0e8] md:text-5xl">
              What Our Clients Say
            </h2>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={prev}
              className="flex h-12 w-12 items-center justify-center border border-[#2a2420] text-[#c4b99a] transition-colors hover:border-[#d4a853] hover:text-[#d4a853]"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              className="flex h-12 w-12 items-center justify-center border border-[#2a2420] text-[#c4b99a] transition-colors hover:border-[#d4a853] hover:text-[#d4a853]"
              aria-label="Next reviews"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {getVisibleReviews().map((review, index) => (
            <div
              key={`${review.name}-${index}`}
              className="border border-[#2a2420] bg-[#221e19] p-8"
            >
              <div className="mb-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating
                        ? "fill-[#d4a853] text-[#d4a853]"
                        : "text-[#2a2420]"
                    }`}
                  />
                ))}
              </div>
              <p className="mb-6 text-sm leading-relaxed text-[#c4b99a]">
                {`"${review.text}"`}
              </p>
              <div className="border-t border-[#2a2420] pt-4">
                <span className="font-semibold text-[#f5f0e8]">{review.name}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 border border-[#2a2420] bg-[#221e19] px-8 py-4">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < 4
                      ? "fill-[#d4a853] text-[#d4a853]"
                      : "fill-[#d4a853]/50 text-[#d4a853]/50"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-[#c4b99a]">
              Rated <strong className="text-[#f5f0e8]">4.6</strong> out of 5 from{" "}
              <strong className="text-[#f5f0e8]">255</strong> reviews on Google
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
