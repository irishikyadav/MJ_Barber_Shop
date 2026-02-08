"use client"

import { useState, useCallback } from "react"
import { X, ChevronLeft, ChevronRight, Scissors, Clock, User, Phone, Check, Calendar, Mail, Loader2 } from "lucide-react"

const services = [
  { id: "classic", title: "Classic Haircut", price: "$35", duration: "30 min" },
  { id: "buzz", title: "Buzz Cut / Clipper Cut", price: "$25", duration: "20 min" },
  { id: "beard", title: "Beard Trim & Shape", price: "$20", duration: "20 min" },
  { id: "combo", title: "Cut & Beard Combo", price: "$50", duration: "45 min" },
  { id: "shave", title: "Hot Towel Shave", price: "$30", duration: "30 min" },
  { id: "kids", title: "Kids Cut", price: "$20", duration: "20 min" },
]

const timeSlots = [
  "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM",
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM", "5:00 PM",
]

const saturdaySlots = [
  "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM",
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM",
]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

const DAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

export function BookingModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState("")
  const [calMonth, setCalMonth] = useState(() => new Date().getMonth())
  const [calYear, setCalYear] = useState(() => new Date().getFullYear())

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const daysInMonth = getDaysInMonth(calYear, calMonth)
  const firstDay = getFirstDayOfMonth(calYear, calMonth)

  const isDateDisabled = (day: number) => {
    const date = new Date(calYear, calMonth, day)
    date.setHours(0, 0, 0, 0)
    if (date < today) return true
    if (date.getDay() === 0) return true // Sunday closed
    return false
  }

  const isDateSelected = (day: number) => {
    if (!selectedDate) return false
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === calMonth &&
      selectedDate.getFullYear() === calYear
    )
  }

  const handleDateClick = (day: number) => {
    if (isDateDisabled(day)) return
    setSelectedDate(new Date(calYear, calMonth, day))
    setSelectedTime(null)
  }

  const prevMonth = () => {
    if (calMonth === 0) {
      setCalMonth(11)
      setCalYear(calYear - 1)
    } else {
      setCalMonth(calMonth - 1)
    }
  }

  const nextMonth = () => {
    if (calMonth === 11) {
      setCalMonth(0)
      setCalYear(calYear + 1)
    } else {
      setCalMonth(calMonth + 1)
    }
  }

  const isPrevDisabled =
    calYear === today.getFullYear() && calMonth === today.getMonth()

  const availableSlots =
    selectedDate?.getDay() === 6 ? saturdaySlots : timeSlots

  const selectedServiceData = services.find((s) => s.id === selectedService)

  const handleSubmit = useCallback(async () => {
    if (!selectedServiceData || !selectedDate || !selectedTime || !name.trim() || !email.trim() || !phone.trim()) return
    setSending(true)
    setSendError("")
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          service: selectedServiceData.title,
          price: selectedServiceData.price,
          duration: selectedServiceData.duration,
          date: selectedDate.toLocaleDateString("en-NZ", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          time: selectedTime,
        }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to send")
      }
      setStep(4)
    } catch (err) {
      setSendError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setSending(false)
    }
  }, [selectedServiceData, selectedDate, selectedTime, name, email, phone])

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString("en-NZ", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : ""

  const reset = useCallback(() => {
    setStep(1)
    setSelectedService(null)
    setSelectedDate(null)
    setSelectedTime(null)
    setName("")
    setEmail("")
    setPhone("")
    setSending(false)
    setSendError("")
    setCalMonth(new Date().getMonth())
    setCalYear(new Date().getFullYear())
  }, [])

  const handleClose = useCallback(() => {
    onClose()
    setTimeout(reset, 300)
  }, [onClose, reset])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1a1612]/80 backdrop-blur-sm"
        onClick={handleClose}
        onKeyDown={(e) => { if (e.key === "Escape") handleClose() }}
        role="button"
        tabIndex={0}
        aria-label="Close booking modal"
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg overflow-hidden bg-[#f5f0e8] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between bg-[#1a1612] px-6 py-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-[#d4a853]" />
            <h2 className="font-serif text-xl font-bold text-[#f5f0e8]">Book Appointment</h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="text-[#c4b99a] transition-colors hover:text-[#f5f0e8]"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Step indicator */}
        <div className="flex border-b border-[#d5cdbf]">
          {["Service", "Date & Time", "Details", "Confirm"].map((label, i) => (
            <div
              key={label}
              className={`flex-1 px-2 py-3 text-center text-xs font-semibold uppercase tracking-wider transition-colors ${
                i + 1 === step
                  ? "bg-[#d4a853] text-[#1a1612]"
                  : i + 1 < step
                    ? "bg-[#ebe5d9] text-[#1a1612]"
                    : "bg-[#ebe5d9] text-[#8a8070]"
              }`}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="max-h-[60vh] overflow-y-auto p-6">
          {/* Step 1: Service Selection */}
          {step === 1 && (
            <div>
              <p className="mb-4 text-sm text-[#4a4035]">Select a service to get started:</p>
              <div className="flex flex-col gap-3">
                {services.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setSelectedService(service.id)}
                    className={`flex items-center justify-between p-4 text-left transition-all ${
                      selectedService === service.id
                        ? "bg-[#1a1612] text-[#f5f0e8]"
                        : "bg-[#ebe5d9] text-[#1a1612] hover:bg-[#e0d9cb]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Scissors
                        className={`h-4 w-4 ${
                          selectedService === service.id ? "text-[#d4a853]" : "text-[#8a8070]"
                        }`}
                      />
                      <div>
                        <span className="block font-serif text-base font-semibold">{service.title}</span>
                        <span
                          className={`block text-xs ${
                            selectedService === service.id ? "text-[#c4b99a]" : "text-[#8a8070]"
                          }`}
                        >
                          <Clock className="mr-1 inline h-3 w-3" />
                          {service.duration}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`font-serif text-lg font-bold ${
                        selectedService === service.id ? "text-[#d4a853]" : "text-[#1a1612]"
                      }`}
                    >
                      {service.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Date & Time Selection */}
          {step === 2 && (
            <div>
              {/* Calendar */}
              <div className="mb-6">
                <div className="mb-3 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={prevMonth}
                    disabled={isPrevDisabled}
                    className="p-1 text-[#4a4035] transition-colors hover:text-[#1a1612] disabled:opacity-30"
                    aria-label="Previous month"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <span className="font-serif text-lg font-semibold text-[#1a1612]">
                    {MONTH_NAMES[calMonth]} {calYear}
                  </span>
                  <button
                    type="button"
                    onClick={nextMonth}
                    className="p-1 text-[#4a4035] transition-colors hover:text-[#1a1612]"
                    aria-label="Next month"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {DAY_NAMES.map((d) => (
                    <div key={d} className="py-1 text-center text-xs font-semibold uppercase text-[#8a8070]">
                      {d}
                    </div>
                  ))}
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1
                    const disabled = isDateDisabled(day)
                    const selected = isDateSelected(day)
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => handleDateClick(day)}
                        disabled={disabled}
                        className={`py-2 text-center text-sm transition-colors ${
                          selected
                            ? "bg-[#d4a853] font-bold text-[#1a1612]"
                            : disabled
                              ? "text-[#c4b99a] cursor-not-allowed"
                              : "text-[#1a1612] hover:bg-[#ebe5d9]"
                        }`}
                      >
                        {day}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <div>
                  <p className="mb-3 text-sm font-semibold text-[#1a1612]">
                    Available times for {selectedDate.toLocaleDateString("en-NZ", { weekday: "long", month: "short", day: "numeric" })}:
                  </p>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className={`px-3 py-2 text-center text-sm transition-all ${
                          selectedTime === slot
                            ? "bg-[#1a1612] font-semibold text-[#d4a853]"
                            : "bg-[#ebe5d9] text-[#1a1612] hover:bg-[#e0d9cb]"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Contact Details */}
          {step === 3 && (
            <div>
              <p className="mb-4 text-sm text-[#4a4035]">
                Enter your details so we can confirm your booking:
              </p>
              <div className="flex flex-col gap-4">
                <div>
                  <label htmlFor="booking-name" className="mb-1 block text-sm font-semibold text-[#1a1612]">
                    Full Name
                  </label>
                  <div className="flex items-center gap-2 bg-[#ebe5d9] px-4 py-3">
                    <User className="h-4 w-4 text-[#8a8070]" />
                    <input
                      id="booking-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full bg-transparent text-sm text-[#1a1612] placeholder-[#8a8070] outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="booking-email" className="mb-1 block text-sm font-semibold text-[#1a1612]">
                    Email Address
                  </label>
                  <div className="flex items-center gap-2 bg-[#ebe5d9] px-4 py-3">
                    <Mail className="h-4 w-4 text-[#8a8070]" />
                    <input
                      id="booking-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email"
                      className="w-full bg-transparent text-sm text-[#1a1612] placeholder-[#8a8070] outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="booking-phone" className="mb-1 block text-sm font-semibold text-[#1a1612]">
                    Phone Number
                  </label>
                  <div className="flex items-center gap-2 bg-[#ebe5d9] px-4 py-3">
                    <Phone className="h-4 w-4 text-[#8a8070]" />
                    <input
                      id="booking-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 021 123 4567"
                      className="w-full bg-transparent text-sm text-[#1a1612] placeholder-[#8a8070] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Summary preview */}
              <div className="mt-6 bg-[#ebe5d9] p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#8a8070]">
                  Booking Summary
                </p>
                <div className="flex flex-col gap-1 text-sm text-[#1a1612]">
                  <span>
                    <span className="font-semibold">Service:</span> {selectedServiceData?.title} ({selectedServiceData?.price})
                  </span>
                  <span>
                    <span className="font-semibold">Date:</span> {formattedDate}
                  </span>
                  <span>
                    <span className="font-semibold">Time:</span> {selectedTime}
                  </span>
                  <span>
                    <span className="font-semibold">Email:</span> {email}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center bg-[#d4a853]">
                <Check className="h-8 w-8 text-[#1a1612]" />
              </div>
              <h3 className="mb-2 font-serif text-2xl font-bold text-[#1a1612]">
                Booking Confirmed!
              </h3>
              <p className="mb-2 text-sm leading-relaxed text-[#4a4035]">
                {"Thank you, "}
                <span className="font-semibold">{name}</span>
                {". A confirmation email has been sent to:"}
              </p>
              <p className="mb-6 text-sm font-semibold text-[#d4a853]">{email}</p>
              <div className="bg-[#ebe5d9] p-5">
                <div className="flex flex-col gap-2 text-sm text-[#1a1612]">
                  <span>
                    <span className="font-semibold">Service:</span> {selectedServiceData?.title}
                  </span>
                  <span>
                    <span className="font-semibold">Date:</span> {formattedDate}
                  </span>
                  <span>
                    <span className="font-semibold">Time:</span> {selectedTime}
                  </span>
                  <span>
                    <span className="font-semibold">Price:</span> {selectedServiceData?.price}
                  </span>
                  <span>
                    <span className="font-semibold">Email:</span> {email}
                  </span>
                </div>
              </div>
              <a
                href="tel:068354580"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-[#1a1612] px-6 py-4 text-sm font-semibold uppercase tracking-widest text-[#d4a853] transition-colors hover:bg-[#2a2420]"
              >
                <Phone className="h-4 w-4" />
                Call 06 835 4580 to Confirm
              </a>
            </div>
          )}
        </div>

        {/* Error message */}
        {sendError && step === 3 && (
          <div className="border-t border-red-200 bg-red-50 px-6 py-3">
            <p className="text-sm text-red-600">{sendError}</p>
          </div>
        )}

        {/* Footer with navigation buttons */}
        {step < 4 && (
          <div className="flex items-center justify-between border-t border-[#d5cdbf] px-6 py-4">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                disabled={sending}
                className="flex items-center gap-1 text-sm font-semibold text-[#4a4035] transition-colors hover:text-[#1a1612] disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </button>
            ) : (
              <div />
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                disabled={
                  (step === 1 && !selectedService) ||
                  (step === 2 && (!selectedDate || !selectedTime))
                }
                className="flex items-center gap-1 bg-[#d4a853] px-6 py-3 text-sm font-semibold uppercase tracking-widest text-[#1a1612] transition-colors hover:bg-[#c49a43] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!name.trim() || !email.trim() || !phone.trim() || sending}
                className="flex items-center gap-2 bg-[#d4a853] px-6 py-3 text-sm font-semibold uppercase tracking-widest text-[#1a1612] transition-colors hover:bg-[#c49a43] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {sending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Submit Request
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </button>
            )}
          </div>
        )}

        {step === 4 && (
          <div className="border-t border-[#d5cdbf] px-6 py-4">
            <button
              type="button"
              onClick={handleClose}
              className="w-full py-3 text-center text-sm font-semibold uppercase tracking-widest text-[#4a4035] transition-colors hover:text-[#1a1612]"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
