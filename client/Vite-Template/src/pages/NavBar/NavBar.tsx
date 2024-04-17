import { useState } from "react";
import Login from "../../components/login/Login";

const NavBar = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  return (
    <>
      <nav className="fixed z-10 w-full  px-6 py-3 mx-auto text-white ">
        <div className="flex items-center justify-between text-blue-gray-900">
          {/* <a href="/a"
      className="mr-4 block cursor-pointer py-1.5 font-sans text-2xl font-semibold leading-relaxed tracking-normal text-inherit antialiased">
      Green Runner
    </a> */}
          <img
            className="sm:w-[7rem] mr-4 block cursor-pointer py-1.5 font-sans font-semibold leading-relaxed tracking-normal text-inherit antialiased"
            src="/Logogreen.png"
            alt="logo"
          />
          <div className="hidden lg:block">
            <ul className="flex flex-col gap-2 my-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
              <li className="block p-1 font-sans text-2xl antialiased font-medium leading-normal text-blue-gray-900">
                <button className="flex items-center transition-colors hover:text-blue-500">
                  About Us
                </button>
              </li>
              <li className="block p-1 font-sans text-2xl antialiased font-medium leading-normal text-blue-gray-900">
                <a
                  href="/a"
                  className="flex items-center transition-colors hover:text-blue-500"
                >
                  Blockchain
                </a>
              </li>
              <li className="block p-1 font-sans text-2xl antialiased font-medium leading-normal text-blue-gray-900">
                <a
                  href="/a"
                  className="flex items-center transition-colors hover:text-blue-500"
                >
                  Reward
                </a>
              </li>
              <li className="block p-1 font-sans text-2xl antialiased font-medium leading-normal text-blue-gray-900">
                <button
                  onClick={toggleLoginModal}
                  className="flex items-center transition-colors hover:text-blue-500"
                >
                  Account
                </button>
              </li>
            </ul>
          </div>
          <button
            className="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
            type="button"
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                aria-hidden="true"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                ></path>
              </svg>
            </span>
          </button>
        </div>
      </nav>
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-60">
          <div className="w-full max-w-md p-5 m-4 overflow-hidden text-left align-middle transition-all transform bg-white bg-opacity-75 shadow-xl rounded-2xl">
            <div className="flex justify-end">
              <button
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                onClick={toggleLoginModal}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <Login />
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
