import React, { useState } from "react";
import { toast } from "sonner";
import {
  Loader2,
  Calendar,
  ArrowRight,
  MapPin,
} from "lucide-react";

import { generateTripWithAI } from "../Services/AiModel";

const BUDGET_OPTIONS = [
  {
    id: "cheap",
    title: "Budget Friendly",
    icon: "$",
  },
  {
    id: "moderate",
    title: "Moderate",
    icon: "$$",
  },
  {
    id: "luxury",
    title: "Luxury",
    icon: "$$$",
  },
];

const TRAVELER_OPTIONS = [
  { id: "solo", title: "Solo", icon: "🧍" },
  { id: "couple", title: "Couple", icon: "❤️" },
  { id: "family", title: "Family", icon: "👨‍👩‍👧‍👦" },
  { id: "friends", title: "Friends", icon: "🎉" },
];

const CreateTrip = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [tripResult, setTripResult] = useState(null);

  const [formData, setFormData] = useState({
    destination: "",
    noOfDays: "",
    traveler: "",
    budget: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.destination || !formData.noOfDays) {
        return toast.error("Please fill all details");
      }
    }

    if (step === 2) {
      if (!formData.budget) {
        return toast.error("Please select budget");
      }
    }

    if (step < 3) {
      setStep(step + 1);
    } else {
      generateTrip();
    }
  };

  const generateTrip = async () => {
    if (
      !formData.destination ||
      !formData.noOfDays ||
      !formData.budget ||
      !formData.traveler
    ) {
      return toast.error("Please fill all details.");
    }

    if (Number(formData.noOfDays) > 5) {
      return toast.error("AI supports max 5 days only.");
    }

    setLoading(true);
    setTripResult(null);

    const DYNAMIC_PROMPT = `
Generate a travel plan for Location: ${formData.destination}
for ${formData.noOfDays} days for a ${formData.traveler} traveler on ${formData.budget} budget.

Use real hotel image URLs from Unsplash.

Return STRICT JSON ONLY:

{
  "tripNote": "",

  "budgetSummary": {
    "totalBudget": "",
    "hotelCost": "",
    "foodCost": "",
    "transportCost": "",
    "activitiesCost": ""
  },

  "hotelsOptions": [
    {
      "name": "",
      "description": "",
      "pricePerNight": "",
      "imageUrl": ""
    }
  ],

  "itinerary": [
    {
      "day": "",
      "theme": "",
      "dailyBudget": "",
      "activities": [
        {
          "time_slot": "",
          "description": "",
          "cost": ""
        }
      ]
    }
  ]
}
`;

    try {
      const result = await generateTripWithAI(DYNAMIC_PROMPT);
      setTripResult(result);
    } catch (error) {
      console.log(error);
      toast.error("Failed to generate trip.");
    } finally {
      setLoading(false);
    }
    };

    if (loading) {
        return (
        <div className="h-screen flex flex-col items-center justify-center">
            <Loader2 className="animate-spin w-10 h-10 text-indigo-600" />

            <p className="mt-4 text-lg font-medium">
            Generating your perfect trip...
            </p>
        </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center px-4 py-10">

        <div className="w-full max-w-5xl bg-white rounded-[30px] shadow-xl overflow-hidden">

            {/* PROGRESS BAR */}
            <div className="h-2 bg-indigo-100">
            <div
                className="h-full bg-indigo-600 transition-all duration-300"
                style={{
                width:
                    step === 1
                    ? "33%"
                    : step === 2
                    ? "66%"
                    : "100%",
                }}
            />
            </div>

            <div className="p-10 md:p-14">

                {/* STEP DOTS */}
                <div className="flex justify-center gap-3 mb-10">
                    {[1, 2, 3].map((item) => (
                    <div
                        key={item}
                        className={`h-3 rounded-full transition-all duration-300 ${
                        step === item
                            ? "w-10 bg-indigo-600"
                            : "w-3 bg-gray-300"
                        }`}
                    />
                    ))}
                </div>

                {/* STEP 1 */}
                {step === 1 && (
                    <div className="max-w-2xl mx-auto">

                    <h1 className="text-3xl font-bold text-center text-gray-900">
                        Where's your next adventure?
                    </h1>

                    <p className="text-center text-gray-500 mt-3 text-lg">
                        Select your destination and duration (max 5 days).
                    </p>

                    <div className="mt-12 space-y-8">

                        {/* DESTINATION */}
                        <div>
                        <label className="block text-lg font-semibold mb-3 text-gray-700">
                            Destination
                        </label>

                        <div className="relative">
                            <MapPin className="absolute left-4 top-4 text-gray-400 w-5 h-5" />

                            <input
                            type="text"
                            placeholder="Search for a city..."
                            value={formData.destination}
                            onChange={(e) =>
                                handleInputChange(
                                "destination",
                                e.target.value
                                )
                            }
                            className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-4 text-lg outline-none focus:border-indigo-500"
                            />
                        </div>
                        </div>

                        {/* DAYS */}
                        <div>
                        <label className="block text-lg font-semibold mb-3 text-gray-700">
                            How many days?
                        </label>

                        <div className="relative">
                            <Calendar className="absolute left-4 top-4 text-gray-400 w-5 h-5" />

                            <input
                            type="number"
                            placeholder="1"
                            min="1"
                            max="5"
                            value={formData.noOfDays}
                            onChange={(e) =>
                                handleInputChange(
                                "noOfDays",
                                e.target.value
                                )
                            }
                            className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-4 text-lg outline-none focus:border-indigo-500"
                            />
                        </div>
                        </div>

                    </div>

                    </div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                    <div className="max-w-3xl mx-auto">

                    <h1 className="text-3xl font-bold text-center text-gray-900">
                        What's your budget?
                    </h1>

                    <p className="text-center text-gray-500 mt-3 text-lg">
                        We'll find spots that match your wallet.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto">

                        {BUDGET_OPTIONS.map((budget) => (

                        <button
                            key={budget.id}
                            onClick={() =>
                                handleInputChange("budget", budget.id)
                            }
                            className={`border-2 rounded-2xl p-7 transition-all duration-300 hover:scale-105 ${
                                formData.budget === budget.id
                                ? "border-gray-300 bg-gray-700/40 backdrop-blur-md text-white"
                                : "border-gray-300/30 bg-white/10 backdrop-blur-md text-white hover:bg-white/20"
                            }`}
                        >


                            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-2xl font-semibold">
                            {budget.icon}
                            </div>

                            <h2 className="mt-5 text-xl font-semibold text-gray-900">
                            {budget.title}
                            </h2>

                        </button>

                        ))}

                    </div>

                    </div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                    <div className="max-w-3xl mx-auto">

                    <h1 className="text-3xl font-bold text-center text-gray-900">
                        Who are you traveling with?
                    </h1>

                    <p className="text-center text-gray-500 mt-3 text-lg">
                        Select your travel style.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-14 max-w-2xl mx-auto">

                        {TRAVELER_OPTIONS.map((traveler) => (

                        <button
                            key={traveler.id}
                            onClick={() =>
                            handleInputChange(
                                "traveler",
                                traveler.id
                            )
                            }

                            className={`border-2 rounded-2xl p-6 transition-all duration-300 hover:scale-105 ${
                                formData.traveler === traveler.id
                                    ? "border-gray-400 bg-gray-700/40 backdrop-blur-md text-white"
                                    : "border-gray-300/30 bg-white/10 backdrop-blur-md text-gray-900 hover:bg-white/20"
                            }`}

                        >

                            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-3xl">
                            {traveler.icon}
                            </div>

                            <h2 className="mt-4 text-lg font-semibold">
                            {traveler.title}
                            </h2>

                        </button>

                        ))}

                    </div>

                    </div>
                )}

                {/* NAVIGATION */}
                <div className="flex justify-between items-center mt-16 border-t pt-8">

                    <button
                    onClick={handleBack}
                    className={`text-lg font-medium ${
                        step === 1
                        ? "opacity-0 pointer-events-none"
                        : "text-gray-600 hover:text-black"
                    }`}
                    >
                    Back
                    </button>

                    <button
                    onClick={handleNext}
                    // className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl flex items-center gap-3 text-lg font-semibold shadow-lg transition-all"
                    className="bg-gray-700/40 hover:bg-gray-600/50 backdrop-blur-md border border-gray-400/30 text-white px-8 py-4 rounded-2xl flex items-center gap-3 text-lg font-semibold shadow-2xl transition-all duration-300"
                    >
                    {step === 3 ? "Generate Trip" : "Continue"}

                    <ArrowRight className="w-5 h-5" />
                    </button>

                </div>

                {/* RESULT */}
                {tripResult && (

                    <div className="mt-16 space-y-10">

                    {/* TITLE */}
                    <div>

                        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-500 to-gray-700 text-transparent bg-clip-text">
                        Your AI Trip Plan ✈️
                        </h2>

                        <p className="text-gray-500 mt-2">
                        Personalized smart travel experience
                        </p>

                    </div>

                    {/* TRIP NOTE */}
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-7">

                        <p className="text-lg text-gray-700 leading-8">
                        {tripResult.tripNote}
                        </p>

                    </div>

                    {/* EXPENSES */}
                    <div>

                        <h3 className="text-2xl font-bold mb-6">
                        Estimated Expenses 💰
                        </h3>

                        <div className="flex overflow-x-auto gap-5 pb-2">

                        {[
                            {
                            title: "Total",
                            value: tripResult.budgetSummary?.totalBudget,
                            },
                            {
                            title: "Hotel",
                            value: tripResult.budgetSummary?.hotelCost,
                            },
                            {
                            title: "Food",
                            value: tripResult.budgetSummary?.foodCost,
                            },
                            {
                            title: "Transport",
                            value: tripResult.budgetSummary?.transportCost,
                            },
                            {
                            title: "Activities",
                            value: tripResult.budgetSummary?.activitiesCost,
                            },
                        ].map((item, i) => (

                            <div
                            key={i}
                            className="min-w-[180px] bg-white rounded-3xl shadow-lg p-6"
                            >

                            <p className="text-gray-500">
                                {item.title}
                            </p>

                            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-500 to-gray-700 text-transparent bg-clip-text mt-2">
                                {item.value}
                            </h2>

                            </div>

                        ))}

                        </div>

                    </div>

                    {/* HOTELS */}
                    <div>

                        <h3 className="text-2xl font-bold mb-6">
                            Recommended Hotels 🏨
                        </h3>

                        <div className="grid md:grid-cols-2 gap-6">

                            {tripResult.hotelsOptions?.map((hotel, i) => (

                            <div
                                key={i}
                                className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300"
                            >

                                <div className="flex items-center justify-between">

                                    <h2 className="text-xl font-bold text-gray-800">
                                        {hotel.name}
                                    </h2>

                                    <span className="bg-gray-700/70 text-gray-200 px-4 py-2 rounded-xl text-sm font-semibold border border-gray-500">
                                        {hotel.pricePerNight}
                                    </span>

                                </div>

                                <p className="text-gray-600 mt-4 leading-7">
                                {hotel.description}
                                </p>

                            </div>

                            ))}

                        </div>

                    </div>

                    {/* ITINERARY */}
                    <div>

                        <h3 className="text-2xl font-bold mb-6">
                        Travel Itinerary 🗺️
                        </h3>

                        <div className="space-y-7">

                        {tripResult.itinerary?.map((day, i) => (

                            <div
                            key={i}
                            className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-3xl p-7 shadow-md"
                            >

                            <div className="flex justify-between items-center mb-5">

                                <h2 className="text-xl font-bold bg-gradient-to-r from-gray-500 to-gray-700 text-transparent bg-clip-text">
                                {day.day} — {day.theme}
                                </h2>

                                <div className="bg-white px-4 py-2 rounded-xl shadow-sm">

                                <p className="text-sm text-gray-500">
                                    Daily Budget
                                </p>

                                <p className="font-bold bg-gradient-to-r from-gray-500 to-gray-700 text-transparent bg-clip-text">
                                    {day.dailyBudget}
                                </p>

                                </div>

                            </div>

                            <div className="space-y-4">

                                {day.activities?.map((act, j) => (

                                <div
                                    key={j}
                                    className="bg-white rounded-2xl p-5 shadow-sm"
                                >

                                    <div className="flex justify-between items-center border-b pb-3">

                                    <h3 className="font-bold text-lg bg-gradient-to-r from-gray-500 to-gray-700 text-transparent bg-clip-text">
                                        {act.time_slot}
                                    </h3>

                                    <p className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-xl font-semibold text-sm border border-gray-500">
                                        {act.cost}
                                    </p>

                                    </div>

                                    <div className="mt-4">

                                    <p className="text-gray-700 leading-7">
                                        {act.description}
                                    </p>

                                    </div>

                                </div>

                                ))}

                            </div>

                            </div>

                        ))}

                        </div>

                    </div>

                </div>

            )}

            </div>

        </div>

        </div>
    );
};

export default CreateTrip;