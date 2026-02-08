import { Phone, MapPin, Clock } from "lucide-react"

const hours = [
  { day: "Monday", time: "8:00 AM - 5:30 PM" },
  { day: "Tuesday", time: "8:00 AM - 5:30 PM" },
  { day: "Wednesday", time: "8:00 AM - 5:30 PM" },
  { day: "Thursday", time: "8:00 AM - 5:30 PM" },
  { day: "Friday", time: "8:00 AM - 5:30 PM" },
  { day: "Saturday", time: "8:00 AM - 3:00 PM" },
  { day: "Sunday", time: "Closed" },
]

export function Contact() {
  return (
    <section id="contact" className="bg-[#f5f0e8] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#d4a853]">Get In Touch</span>
          <h2 className="mt-4 font-serif text-4xl font-bold text-[#1a1612] md:text-5xl">
            Visit Us Today
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-[#d4a853]" />
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Location */}
          <div className="bg-[#ebe5d9] p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center bg-[#d4a853]">
              <MapPin className="h-5 w-5 text-[#1a1612]" />
            </div>
            <h3 className="mb-2 font-serif text-xl font-semibold text-[#1a1612]">Location</h3>
            <p className="text-sm leading-relaxed text-[#4a4035]">
              Located in the Old County Hotel
              <br />
              212 Emerson Street
              <br />
              Napier South, Napier 4110
              <br />
              New Zealand
            </p>
            <a
              href="https://maps.google.com/?q=212+Emerson+Street+Napier+4110"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm font-semibold text-[#d4a853] hover:underline"
            >
              Get Directions
            </a>
          </div>

          {/* Hours */}
          <div className="bg-[#ebe5d9] p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center bg-[#d4a853]">
              <Clock className="h-5 w-5 text-[#1a1612]" />
            </div>
            <h3 className="mb-4 font-serif text-xl font-semibold text-[#1a1612]">Hours</h3>
            <div className="flex flex-col gap-2">
              {hours.map((item) => (
                <div key={item.day} className="flex justify-between text-sm">
                  <span className="text-[#4a4035]">{item.day}</span>
                  <span
                    className={`font-medium ${item.time === "Closed" ? "text-[#b05a50]" : "text-[#1a1612]"}`}
                  >
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="bg-[#ebe5d9] p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center bg-[#d4a853]">
              <Phone className="h-5 w-5 text-[#1a1612]" />
            </div>
            <h3 className="mb-2 font-serif text-xl font-semibold text-[#1a1612]">Contact</h3>
            <p className="mb-4 text-sm leading-relaxed text-[#4a4035]">
              Walk-ins welcome. For appointments or enquiries, give us a call.
            </p>
            <a
              href="tel:068354580"
              className="inline-flex items-center gap-2 text-lg font-bold text-[#1a1612]"
            >
              <Phone className="h-5 w-5 text-[#d4a853]" />
              06 835 4580
            </a>
            <div className="mt-8">
              <a
                href="tel:068354580"
                className="inline-flex w-full items-center justify-center bg-[#1a1612] px-6 py-4 text-sm font-semibold uppercase tracking-widest text-[#d4a853] transition-colors hover:bg-[#2a2420]"
              >
                Call to Book
              </a>
            </div>
          </div>
        </div>

        {/* Map link */}
        <div className="mt-12 overflow-hidden">
          <a
            href="https://www.google.com/maps/search/?api=1&query=MJ%27s+Barber+Shop+212+Emerson+Street+Napier+4110+New+Zealand"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-[#ebe5d9] px-8 py-12 transition-colors hover:bg-[#e0d9cb]"
          >
            <MapPin className="h-6 w-6 text-[#d4a853]" />
            <span className="font-serif text-xl font-semibold text-[#1a1612]">
              View on Google Maps
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
