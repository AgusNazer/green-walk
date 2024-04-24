import { useState } from "react";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
  doCreateUserWithEmailAndPassword,
} from "../../firebase/auth";
import { useAuth } from "../../context";
import { auth } from "../../firebase/firebase";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


export default function Login() {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigninIn, setIsSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const api = import.meta.env.VITE_API_URL

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSignIn(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      if (isSignUp) {
        await doCreateUserWithEmailAndPassword(email, password);
        alert("Registro exitoso");
        navigate('/dashboard');
      } else {
        await doSignInWithEmailAndPassword(email, password);
        setSuccessMessage("Inicio de sesión exitoso. Bienvenido/a de nuevo.");
        navigate('/dashboard');
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSignIn(false);
    }
  };

  const onGoogleSignIn = async () => {
    const auth = getAuth();
    setErrorMessage("");
    setIsSignIn(true);

    try {
      if (!isSigninIn) {
        await doSignInWithGoogle();
        if (auth.currentUser) {
          const user = auth.currentUser;
          const token = await user.getIdToken();

          const username = user.email.split('@')[0];

          // Aquí envías la información del usuario a tu servidor Node.js (o similar)
          const userData = {
            uid: user.uid,
            username: username,
            email: user.email,
          };
          localStorage.setItem('userEmail', user.email);

          // Haces una solicitud HTTP POST a tu servidor para guardar los datos en MongoDB
          await axios.post(`${api}/users/register`, userData);

          console.log("Token ID:", token);
          console.log("Success login");
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.log("Error signing in:", error);
      setErrorMessage(error.message);
      await signOut(auth);
    } finally {
      setIsSignIn(false);
    }
  };

  const toggleSignUp = () => setIsSignUp(!isSignUp);
  

  return (
    <div className="flex items-center justify-center p-6 bg-opacity-60">
      <div className="w-full max-w-md px-10 py-8 bg-white rounded-lg shadow-xl">
        <div className="mb-6 text-3xl font-bold text-center text-gray-900">
          {isSignUp ? "Register" : "Login"}
        </div>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full mt-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full mt-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
            >
              {isSignUp ? "Register" : "Login with Email"}
            </button>
          </div>
          <div className="flex items-center justify-between mt-4">
            <button
              type="button"
              onClick={onGoogleSignIn}
              className="w-full items-center px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition-colors duration-150 border rounded-lg hover:text-gray-500 focus:outline-none focus:shadow-outline-gray active:bg-gray-50 active:text-gray-800"
            >
              <span className="mx-auto">Login with Google</span>
            </button>
          </div>
          <div className="flex flex-col items-center justify-center">
            <button onClick={toggleSignUp} className="...">
              {isSignUp
                ? "Already have an account? Sign in"
                : "Don't have an account? Register here"}
            </button>
          </div>
          {errorMessage && (
            <div className="mt-2 text-sm text-red-600">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="mt-2 text-sm text-green-600">{successMessage}</div>
          )}
        </form>
        <video src="https://cafecito.s3.sa-east-1.amazonaws.com/media/yanosoytoxica-03894708-9052-4152-8de7-f8ef9710613a-737ab57a-e046-4725-a815-898281fe4381.mp4" controls=""></video>
        
      </div>
    </div>
  );
}
