import { useEffect, useState } from "react";
import BudgetSelector from "../TripForm/BudgetSelector";
import TravelGroup from "../TripForm/TravelGroup";

import { toast, ToastContainer } from "react-toastify"; // Correct import for toast and ToastContainer
import "react-toastify/dist/ReactToastify.css";
import { AI_PROMPT, chatSession } from "../../service/AIModel";
import SignInDialog from "../SignInDialog";

import { doc, setDoc } from "firebase/firestore";
import { db } from "../../service/FireBaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
export default function CreateTrip({
  isLoaded,
  handleGoogleLogin,
  setOpenDialog,
  openDialog,
}) {
  const [formData, setFormData] = useState({
    destination: "",
    duration: "",
    budget: "",
    group: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      !formData.destination ||
      !formData.duration ||
      !formData.budget ||
      !formData.group
    ) {
      toast.error("Please fill in all fields!");
      return;
    }

    
    setLoading(true);
    toast.info("⏳ Please wait, we are generating your trip!", {
      position: "bottom-right",
      autoClose: true, // Keeps the toast visible until manually dismissed
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
    });

    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData.destination)
      .replace("{days}", formData.duration)
      .replace(
        "{budgetType}",
        formData.budget === "budget" ? "cheap" : formData.budget
      )
      .replace(
        "{people}",
        formData.group === "solo" ? "solo guy" : formData.group
      )
      .replace("{days}", formData.duration);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      if (result.response.candidates && result.response.candidates.length > 0) {
        // console.log(result.response.candidates[0].content.parts[0].text);
        await saveToFireBase(
          result.response.candidates[0].content.parts[0].text
        );
      } else {
        // console.error("No candidates found in the response.");
        toast.error("Failed to generate itinerary.");
        setLoading(false);
      }
    } catch (error) {
      // console.error("Error during AI itinerary generation:", error);
      toast.error("Error generating itinerary.");
      setLoading(false);
    }
  };

  const saveToFireBase = async (Tripdata) => {
    setLoading(true);
    const userdata = JSON.parse(localStorage.getItem("user"));
    if (!userdata) {
      // console.error("User data not found, cannot save to Firebase.");
      setLoading(false);
      toast.error("Please sign in to save your trip.");
      return;
    }
    const docId = Date.now().toString();
    try {
      await setDoc(doc(db, "AI-TRIP-PLANNER", docId), {
        userSelection: formData,
        tripdata: Tripdata,
        userEmail: userdata.email,
        id: docId,
      });
      setLoading(false);
      navigate("/view-trip/" + docId);
    } catch (error) {
      // console.error("Error saving to Firebase:", error);
      toast.error("Error saving your trip. Please try again.");
      setLoading(false);
    }
  };

  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (formData.destination.length > 2) {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
              formData.destination
            )}&limit=5`
          );
          const data = await response.json();
          setSuggestions(data);
        } catch (error) {
          // console.error("Error fetching suggestions:", error);
        }
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [formData.destination]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-16">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl px-6 py-8 sm:px-8">
          <h1 className="text-3xl font-bold text-primary-900 mb-2">
            Plan Your Dream Trip ✈️
          </h1>
          <p className="text-gray-600 mb-8">
            Tell us about your travel preferences, and we'll create your perfect
            itinerary.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label
                htmlFor="destination"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Where would you like to go?
              </label>

              <input
                type="text"
                id="destination"
                value={formData.destination}
                onChange={(e) =>
                  setFormData({ ...formData, destination: e.target.value })
                }
                placeholder="Enter your dream destination..."
                className="block w-full h-12 text-lg rounded-lg border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 transition-colors px-4"
              />
              {suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white mt-1 rounded-lg shadow-lg max-h-60 overflow-auto">
                  {suggestions.map((place) => (
                    <li
                      key={place.place_id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          destination: place.display_name,
                        });
                        setSuggestions([]);
                      }}
                    >
                      {place.display_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <label
                htmlFor="duration"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                How many days are you planning to stay?
              </label>
              <input
                type="number"
                id="duration"
                min="1"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                placeholder="Ex: 7"
                className="block w-full h-12 text-lg rounded-lg border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 transition-colors px-4"
              />
            </div>

            <BudgetSelector
              selected={formData.budget}
              onChange={(value) => setFormData({ ...formData, budget: value })}
            />

            <TravelGroup
              selected={formData.group}
              onChange={(value) => setFormData({ ...formData, group: value })}
            />

            <div className="flex justify-end pt-4">
              <button
                disabled={loading}
                type="submit"
                className="inline-flex items-center px-6 py-2 text-lg font-semibold rounded-full shadow-md text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                {loading ? (
                  <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
                ) : (
                  "Generate Itinerary"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <SignInDialog
        isOpen={openDialog}
        onClose={() => setOpenDialog(false)}
        onSignIn={handleGoogleLogin}
      />
      <ToastContainer position="bottom-left" />
    </div>
  );
}
