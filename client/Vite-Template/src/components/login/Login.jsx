import { useState } from "react";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
  doCreateUserWithEmailAndPassword,
} from "../../firebase/auth";
import { useAuth } from "../../context";

export default function Login() {
  const { userLoggedIn } = useAuth;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigninIn, setIsSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSignIn(true); // Indicar que se está procesando
    setErrorMessage("");
    setSuccessMessage("");
    try {
      if (isSignUp) {
        // Registro de nuevo usuario
        await doCreateUserWithEmailAndPassword(email, password);
        alert("Registro exitoso");
      } else {
        // Inicio de sesión de usuario existente
        await doSignInWithEmailAndPassword(email, password);
        // console.log("Inicio de sesión exitoso");
        setSuccessMessage("Inicio de sesión exitoso. Bienvenido/a de nuevo.");
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSignIn(false); // Finalizar el proceso de inicio de sesión/registro
    }
  };
  // with google
  const onGoogleSignIn = async () => {
    setErrorMessage("");
    try {
      if (!isSigninIn) {
        await doSignInWithGoogle();
      }
      console.log("succes login");
    } catch (error) {
      setIsSignIn(false);
    }
  };
  // Función para alternar entre registro y login
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
      </div>
    </div>
  );
}
