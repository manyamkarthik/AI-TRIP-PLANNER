import { useState } from 'react';
import './App.css';
import { Header } from './components/Header';
import { AllRoutes } from './routes/All_Routes';
import { useJsApiLoader } from '@react-google-maps/api';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

import { Footer } from './components/Footer';
import { toast } from 'react-toastify';
import { Outlet, useNavigate } from 'react-router-dom';

function App() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });
  

  const [user, setUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate=useNavigate();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (response) => {
      getUserProfile(response);
    },
    onError: (error) => {
      
      toast.error("Google Sign-in failed. Please try again.");
    },
  });

  const getUserProfile = (tokenInfo) => {
    axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${tokenInfo.access_token}`,
        },
      })
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        setUser(resp.data);
        
        setOpenDialog(false);
      })
      .catch((error) => {
        
        toast.error("Failed to fetch your Google profile.");
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    
  };

  return (
    <>
      <Header
        handleGoogleLogin={handleGoogleLogin}
        user={user}
        setUser={setUser}
        handleSignOut={handleSignOut}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
      {isLoaded ? (
        <AllRoutes
          isLoaded={isLoaded}
          handleGoogleLogin={handleGoogleLogin}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
        />
      ) : (
        <div>Loading Google Maps...</div>
      )}
      <Outlet />

      <Footer />
    </>
  );
}

export default App;