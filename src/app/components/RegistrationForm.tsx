import React, { useState } from "react";
import { User, BedDouble, ConciergeBell, CreditCard, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";

const steps = [
  { id: 1, title: "Guest Info", icon: User },
  { id: 2, title: "Room Selection", icon: BedDouble },
  { id: 3, title: "Services", icon: ConciergeBell },
  { id: 4, title: "Payment", icon: CreditCard },
];

export function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col flex-1 transition-colors duration-200">
      {/* Progress Bar */}
      <div className="px-4 py-5 sm:px-6 lg:px-8 lg:py-6 border-b border-slate-100 dark:border-slate-800">
        <div className="relative flex justify-between">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 dark:bg-slate-800 -translate-y-1/2 rounded-full z-0 transition-colors"></div>
          <div 
            className="absolute top-1/2 left-0 h-1 bg-cyan-500 dark:bg-cyan-400 -translate-y-1/2 rounded-full z-0 transition-all duration-300" 
            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
          ></div>
          
          {steps.map((step, idx) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;
            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                <div 
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-200 ${
                    isCompleted ? "bg-cyan-500 dark:bg-cyan-400 text-white dark:text-slate-900 shadow-md shadow-cyan-200 dark:shadow-none" :
                    isCurrent ? "bg-white dark:bg-slate-900 border-2 border-cyan-500 dark:border-cyan-400 text-cyan-600 dark:text-cyan-400 shadow-sm" :
                    "bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500"
                  }`}
                >
                  {isCompleted ? <CheckCircle2 size={20} /> : <step.icon size={18} />}
                </div>
                <span className={`hidden sm:inline text-xs font-semibold ${isCurrent ? "text-cyan-600 dark:text-cyan-400" : isCompleted ? "text-slate-700 dark:text-slate-300" : "text-slate-400 dark:text-slate-600"}`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <div className="p-4 sm:p-6 lg:p-8 flex-1 flex flex-col min-h-[400px]">
        {currentStep === 1 && <GuestInfoStep />}
        {currentStep === 2 && <RoomSelectionStep />}
        {currentStep === 3 && <ServicesStep />}
        {currentStep === 4 && <PaymentStep />}
        
        {/* Navigation Buttons */}
        <div className="mt-auto pt-8 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 transition-colors">
          <button 
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              currentStep === 1 
                ? "text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-50" 
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <ChevronLeft size={16} />
            Back
          </button>
          <button 
            onClick={nextStep}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium bg-cyan-500 hover:bg-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-500 text-white shadow-sm shadow-cyan-200 dark:shadow-none transition-all active:scale-[0.98]"
          >
            {currentStep === 4 ? "Complete Check-in" : "Next Step"}
            {currentStep < 4 && <ChevronRight size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}

function GuestInfoStep() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6">Guest Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">First Name</label>
          <input type="text" className="w-full h-11 px-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 dark:focus:border-cyan-400 placeholder:text-slate-400 transition-colors" placeholder="John" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Last Name</label>
          <input type="text" className="w-full h-11 px-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 dark:focus:border-cyan-400 placeholder:text-slate-400 transition-colors" placeholder="Doe" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
          <input type="email" className="w-full h-11 px-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 dark:focus:border-cyan-400 placeholder:text-slate-400 transition-colors" placeholder="john.doe@example.com" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone Number</label>
          <input type="tel" className="w-full h-11 px-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 dark:focus:border-cyan-400 placeholder:text-slate-400 transition-colors" placeholder="+1 (555) 000-0000" />
        </div>
        <div className="md:col-span-2 space-y-2 mt-1 sm:mt-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Special Requests / Notes</label>
          <textarea className="w-full h-24 p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 dark:focus:border-cyan-400 resize-none placeholder:text-slate-400 transition-colors" placeholder="Any special requests like late check-out, extra pillows, etc."></textarea>
        </div>
      </div>
    </div>
  );
}

function RoomSelectionStep() {
  const rooms = [
    { id: 1, type: "Deluxe King", price: "$249", beds: "1 King Bed", capacity: 2, available: 12 },
    { id: 2, type: "Executive Suite", price: "$499", beds: "1 King Bed + Sofa", capacity: 4, available: 3 },
    { id: 3, type: "Twin Standard", price: "$189", beds: "2 Twin Beds", capacity: 2, available: 8 },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 h-full flex flex-col">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-6">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Room Selection</h3>
        <div className="grid grid-cols-2 gap-3 sm:flex sm:gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Check-in</span>
            <div className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-sm font-medium text-slate-800 dark:text-slate-200">Oct 24, 2023</div>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Check-out</span>
            <div className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-sm font-medium text-slate-800 dark:text-slate-200">Oct 27, 2023</div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {rooms.map((room, idx) => (
          <label key={room.id} className="relative flex cursor-pointer rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-4 shadow-sm hover:border-cyan-200 dark:hover:border-cyan-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus-within:ring-2 focus-within:ring-cyan-500/20 group">
            <input type="radio" name="roomType" className="sr-only peer" defaultChecked={idx === 0} />
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-cyan-50 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center text-cyan-500 dark:text-cyan-400 shrink-0">
                  <BedDouble size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{room.type}</p>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800">
                      {room.available} left
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mt-1">
                    <span className="flex items-center gap-1"><User size={14}/> Up to {room.capacity} guests</span>
                    <span className="w-1 h-1 bg-slate-300 dark:bg-slate-600 rounded-full"></span>
                    <span>{room.beds}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{room.price}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">/ night</p>
              </div>
            </div>
            {/* Active Border Overlay */}
            <div className="absolute inset-0 rounded-xl border-2 border-transparent peer-checked:border-cyan-500 dark:peer-checked:border-cyan-400 pointer-events-none"></div>
          </label>
        ))}
      </div>
    </div>
  );
}

function ServicesStep() {
  const services = [
    { id: "breakfast", name: "Continental Breakfast", desc: "Fresh pastries, coffee, and fruit daily", price: "$25", unit: "/ person / day" },
    { id: "spa", name: "Spa Access Pass", desc: "Full access to sauna, pool, and wellness center", price: "$50", unit: "/ stay" },
    { id: "airport", name: "Airport Transfer", desc: "One-way private luxury car transfer", price: "$85", unit: "/ trip" },
    { id: "late", name: "Late Checkout", desc: "Extend checkout time to 4:00 PM", price: "$40", unit: "/ stay" },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">Add-on Services</h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Enhance the guest experience with these additional services.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <label key={service.id} className="relative flex cursor-pointer rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-4 shadow-sm hover:border-cyan-200 dark:hover:border-cyan-800 transition-colors">
            <div className="flex items-start gap-4 w-full">
              <div className="mt-1">
                <input type="checkbox" className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-cyan-600 focus:ring-cyan-500/20" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-900 dark:text-slate-100">{service.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-2 line-clamp-1">{service.desc}</p>
                <p className="text-sm font-bold text-cyan-600 dark:text-cyan-400">
                  {service.price} <span className="text-xs font-normal text-slate-500 dark:text-slate-500">{service.unit}</span>
                </p>
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

function PaymentStep() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 flex flex-col xl:flex-row gap-6 xl:gap-8">
      <div className="flex-1">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6">Payment Method</h3>
        <div className="space-y-4">
          <div className="flex gap-4">
            <label className="flex-1 relative flex cursor-pointer rounded-lg border border-cyan-200 dark:border-cyan-800 bg-cyan-50/50 dark:bg-cyan-900/20 p-4 transition-colors">
              <input type="radio" name="paymentType" className="sr-only" defaultChecked />
              <div className="flex items-center gap-3 w-full">
                <CreditCard className="text-cyan-600 dark:text-cyan-400" size={20} />
                <span className="font-semibold text-cyan-900 dark:text-cyan-100 text-sm">Credit Card</span>
              </div>
              <div className="absolute inset-0 rounded-lg border-2 border-cyan-500 dark:border-cyan-400 pointer-events-none"></div>
            </label>
            <label className="flex-1 relative flex cursor-pointer rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <input type="radio" name="paymentType" className="sr-only" />
              <div className="flex items-center gap-3 w-full opacity-60">
                <div className="w-5 h-5 border-2 border-slate-400 dark:border-slate-500 rounded-sm"></div>
                <span className="font-semibold text-slate-700 dark:text-slate-300 text-sm">Cash / On Site</span>
              </div>
            </label>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800 mt-2 transition-colors">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Cardholder Name</label>
              <input type="text" className="w-full h-11 px-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 dark:focus:border-cyan-400 transition-colors" placeholder="John Doe" defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Card Number</label>
              <div className="relative">
                <input type="text" className="w-full h-11 pl-10 pr-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 dark:focus:border-cyan-400 font-mono text-sm tracking-widest transition-colors" placeholder="0000 0000 0000 0000" defaultValue="4111 1111 1111 1111" />
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Expiry Date</label>
                <input type="text" className="w-full h-11 px-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 dark:focus:border-cyan-400 transition-colors" placeholder="MM/YY" defaultValue="12/25" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">CVV</label>
                <input type="text" className="w-full h-11 px-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 dark:focus:border-cyan-400 transition-colors" placeholder="123" defaultValue="123" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full xl:w-72 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-100 dark:border-slate-700 flex flex-col self-stretch xl:self-start transition-colors duration-200">
        <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-4">Summary</h4>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">Deluxe King (3 nights)</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">$747.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">Breakfast (x2)</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">$150.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">Taxes & Fees</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">$89.70</span>
          </div>
          <div className="pt-3 mt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center transition-colors">
            <span className="font-bold text-slate-800 dark:text-slate-100">Total</span>
            <span className="font-bold text-xl text-cyan-600 dark:text-cyan-400">$986.70</span>
          </div>
        </div>
      </div>
    </div>
  );
}
