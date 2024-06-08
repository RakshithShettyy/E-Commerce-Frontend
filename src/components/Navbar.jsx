import React, { useEffect, useState } from "react";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { IoPersonOutline, IoSearchOutline } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import { useTheme } from "../ThemeProvider/theme";
import axios from "axios";
import { Button } from "./ui/button";
import logo from "/images/logo/logoGpt.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import toast, { Toaster } from "react-hot-toast";
import {
  CreditCard,
  Keyboard,
  LogIn,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

// import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("There was an error!", error));
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser);
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <div>
        <nav
          className={`bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600`}>
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src={logo} className="h-8" alt="logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                EcoCart
              </span>
            </a>
            <div className="flex md:order-2 space-x-5 md:space-x-5 lg:space-x-5 rtl:space-x-reverse items-center">
              <a
                href="/search"
                className={`h-6 w-6 nav__icon ${theme === "dark" ? "text-white" : "text-black"} hover:text-blue-700`}>
                <IoSearchOutline />
              </a>

              <a
                href="/cart"
                className={`h-6 w-6 nav__icon ${theme === "dark" ? "text-white" : "text-black"} hover:text-blue-700`}>
                <CiShoppingCart />
              </a>

              <button
                onClick={toggleTheme}
                style={{
                  fontSize: "24px",
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                }}>
                {theme === "light" ? "🌙" : "☀️"}
              </button>

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <Link to="/profile">
                        <DropdownMenuItem>
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </Link>
                      <Link to="/billing">
                        <DropdownMenuItem>
                          <CreditCard className="mr-2 h-4 w-4" />
                          <span>Billing</span>
                          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </Link>
                      {/* <Link to="/profile"></Link> */}

                      <DropdownMenuItem>
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>Billing</span>
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Keyboard className="mr-2 h-4 w-4" />
                        <span>Keyboard shortcuts</span>
                        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />

                    {user ? (
                      <DropdownMenuItem
                        onClick={() => {
                          auth
                            .signOut()
                            .then(() => {
                              // toast.success("User logged out successfully");
                              navigate("/");
                            })
                            .catch((error) => {
                              console.error("Logout error:", error);
                              alert("Failed to log out");
                            });
                        }}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem onClick={() => navigate("/login")}>
                        <LogIn className="mr-2 h-4 w-4" />
                        <span>Log In</span>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button onClick={() => navigate("/login")}>Login</Button>
              )}

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-sticky"
                aria-expanded={isMenuOpen}>
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>

            {isMenuOpen && (
              <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {categories.map((category, index) => (
                    <a
                      key={index}
                      href="#"
                      className="text-gray-700 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium">
                      {category}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
