import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../service/FireBaseConfig";
import { UserTripDetails } from "./UserTripDetails";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";  // Ensure you import the skeleton styles
import { toast } from "react-toastify";

export const MyTrips = () => {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state to control skeleton visibility

  useEffect(() => {
    GetUserTrips();
  });

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return;
    }

    try {
      const q = query(
        collection(db, "AI-TRIP-PLANNER"),
        where("userEmail", "==", user.email)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast.error("No trips found for this user");
        setUserTrips([]); // No trips found
      } else {
        const trips = [];
        querySnapshot.forEach((doc) => {
          trips.push(doc.data());
        });
        setUserTrips(trips);
      }
    } catch (error) {
      toast.error("Error fetching user trips:", error);
    } finally {
      setLoading(false); // Stop loading once data fetch is done
    }
  };

  return (
    <main>
      <div className="main-content">
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
          <h2 className="font-bold text-2xl">My Trips</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 my-3 mt-10">
            {loading ? (
              // Show skeleton loaders while loading
              [...Array(3)].map((_, index) => (
                <div key={index} className="col-span-3">
                  <Skeleton height={150} />
                </div>
              ))
            ) : userTrips.length === 0 ? (
              // If no trips, display a message
              <div className="col-span-3 text-center text-lg text-gray-600">
                You have no trips planned yet.
              </div>
            ) : (
              // Map over userTrips to render actual data
              userTrips.map((tripData, index) => (
                <UserTripDetails key={index} tripData={tripData} />
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
