import { useState, useEffect } from 'react';
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
  const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (response) => {
      getUserProfile(response);
    },
    onError: (error) => {
      toast.error("Google Sign-in failed. Please try again.");
    },
  });

  const getUserProfile = async (tokenInfo) => {
    try {
      const resp = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${tokenInfo.access_token}`,
        },
      });
      
      localStorage.setItem("user", JSON.stringify(resp.data));
      setUser(resp.data);
      setOpenDialog(false);
      toast.success("Successfully signed in!");
    } catch (error) {
      toast.error("Failed to fetch your Google profile.");
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    toast.success("Successfully signed out!");
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        handleGoogleLogin={handleGoogleLogin}
        user={user}
        setUser={setUser}
        handleSignOut={handleSignOut}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
      <main className="flex-grow pt-16">
        <AllRoutes
          isLoaded={isLoaded}
          handleGoogleLogin={handleGoogleLogin}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
        />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;