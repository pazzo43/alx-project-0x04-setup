Step 1: Duplicate the Project
# Navigate to your projects directory
cd /path/to/your/projects

# Duplicate the project (adjust the path as needed)
cp -r alx-project-0x04 alx-project-0x05

# Navigate to the new project
cd alx-project-0x05

Step 2: Create the Context Directory and File
# Create context directory in project root
mkdir context

# Create the CountContext.tsx file
touch context/CountContext.tsx

Step 3: Add the Context Provider Code
Replace the content of context/CountContext.tsx with the provided code:
import { createContext, useContext,  useState, ReactNode } from "react"

interface CountContextProps {
  count: number
  increment: () => void
  decrement: () => void
}

export const CountContext = createContext<CountContextProps | undefined>(undefined)

export const CountProvider = ({ children }: { children: ReactNode}) => {

  const [count, setCount] = useState<number>(0)

  const increment = () => setCount((count ) =>count + 1)
  const decrement = () => setCount((count) => count > 0 ? count - 1 : 0)

  return (
    <CountContext.Provider value={{ count, increment, decrement }}>
      {children}
    </CountContext.Provider>
  )
}

export const useCount = () => {
  const context = useContext(CountContext)

  if (!context) {
    throw new Error("useCount must be within a Count Provider")
  }

  return context
}
Step 4: Update the App Document
Replace the content of _app.tsx:
import Layout from "@/components/layouts/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CountProvider } from "@/context/CountContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CountProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CountProvider>
  )
}

Step 5: Update the Header Component
Replace the content of components/layouts/Header.tsx:
import Link from "next/link";
import Button from "../common/Button";
import { usePathname } from "next/navigation";
import { useCount } from "@/context/CountContext";

const Header: React.FC = () => {

  const pathname = usePathname()
  const { count } = useCount()

  return (
    <header className="fixed w-full bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-6 px-4 md:px-8">
        <Link href="/" className="text-3xl md:text-5xl font-bold text-gray-800 tracking-tight">
          Splash App
        </Link>

        {/* Button Group */}
        <div className="flex gap-4">
          {
            !["/counter-app"].includes(pathname) ? (
              <>
              <Button
            buttonLabel="Sign In"
            buttonBackgroundColor="red"
          />
          <Button
            buttonLabel="Sign Up"
            buttonBackgroundColor="blue"
          /></>
            ) : (
              <p className=" font-semibold text-lg">Current count : {count}</p>
            )
          }

        </div>
      </div>
    </header>
  );
};

export default Header;

Step 6: Update Your Counter Component
Make sure your counter component (likely in pages/counter-app.tsx) uses the context:
import { useCount } from "@/context/CountContext";

const CounterApp: React.FC = () => {
  const { count, increment, decrement } = useCount();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-16">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-6">Counter App</h1>
        <div className="text-6xl font-bold mb-8">{count}</div>
        <div className="flex gap-4 justify-center">
          <button
            onClick={decrement}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold"
          >
            Decrement
          </button>
          <button
            onClick={increment}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold"
          >
            Increment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CounterApp;

Step 7: Run the Development Server
npm run dev -- -p 3000
Step 8: Test the Application
Open http://localhost:3000 in your browser

Click on the "Counter App" button/link to navigate to /counter-app

You should see:

The counter value displayed in both the Header and the main CounterApp component

When you click increment/decrement buttons, both displays update simultaneously
Key Concepts Demonstrated
What You've Achieved:
Global State Management: The count state is now global and accessible from any component

No Prop Drilling: You don't need to pass count through multiple component layers

Shared State: Multiple components (Header and CounterApp) can read and update the same state

Type Safety: TypeScript interfaces ensure type safety throughout the application

How Context API Works Here:
CountProvider: Wraps your entire app and provides the state and functions

useCount Hook: Custom hook that lets any component access the context

Single Source of Truth: The count state lives in one place (Context) but is accessible everywhere

Expected Behavior:
When you're on the home page: See "Sign In" and "Sign Up" buttons

When you're on /counter-app: See the current count in the header

When you increment/decrement: Both the header and main component update simultaneously

Common Issues to Watch For:
Import paths: Make sure your import paths match your project structure

TypeScript errors: Ensure all types are properly defined

Provider placement: The CountProvider must wrap your entire app in _app.tsx
