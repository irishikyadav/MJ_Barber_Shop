import { Scissors, SprayCan as Spray, Sparkles } from "lucide-react"

const services = [
  {
    icon: Scissors,
    title: "Classic Haircut",
    description: "Traditional and modern cuts tailored to your style. Includes consultation, wash, cut, and styling.",
    price: "$35",
  },
  {
    icon: Scissors,
    title: "Buzz Cut / Clipper Cut",
    description: "Clean clipper work for a sharp, low-maintenance look. Quick and precise.",
    price: "$25",
  },
  {
    icon: Sparkles,
    title: "Beard Trim & Shape",
    description: "Expert beard grooming with hot towel treatment. Sculpted and cleaned to perfection.",
    price: "$20",
  },
  {
    icon: Scissors,
    title: "Cut & Beard Combo",
    description: "The full experience. Haircut paired with a precision beard trim and shape.",
    price: "$50",
  },
  {
    icon: Spray,
    title: "Hot Towel Shave",
    description: "A luxurious straight-razor shave with warm lather, hot towels, and aftershave balm.",
    price: "$30",
  },
  {
    icon: Sparkles,
    title: "Kids Cut",
    description: "Gentle, patient cuts for the young ones. A relaxed experience for children of all ages.",
    price: "$20",
  },
]

export function Services() {
  return (
    <section id="services" className="bg-[#1a1612] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#d4a853]">What We Offer</span>
          <h2 className="mt-4 font-serif text-4xl font-bold text-[#f5f0e8] md:text-5xl">
            Our Services
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-[#d4a853]" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group border border-[#2a2420] bg-[#221e19] p-8 transition-all hover:border-[#d4a853]/30"
            >
              <div className="mb-4 flex items-center justify-between">
                <service.icon className="h-6 w-6 text-[#d4a853]" />
                <span className="font-serif text-2xl font-bold text-[#d4a853]">{service.price}</span>
              </div>
              <h3 className="mb-2 font-serif text-xl font-semibold text-[#f5f0e8]">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#8a8070]">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-[#8a8070]">
            Prices may vary. Contact us for the most current pricing.
          </p>
        </div>
      </div>
    </section>
  )
}
