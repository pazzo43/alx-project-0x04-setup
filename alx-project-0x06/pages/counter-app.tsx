Step-by-Step Redux Implementation
Step 1: Duplicate the Project
# Navigate to your projects directory
cd /path/to/your/projects

# Duplicate the Context API project
cp -r alx-project-0x05 alx-project-0x06

# Navigate to the new project
cd alx-project-0x06

Step 2: Install Redux Dependencies
# Install Redux Toolkit and React-Redux
npm install @reduxjs/toolkit react-redux

# Install TypeScript types (if needed)
npm install @types/react-redux

Step 3: Create the Store Directory and File
# Create store directory in project root
mkdir store

# Create the store.ts file
touch store/store.ts

Step 4: Set Up the Redux Store
Replace the content of store/store.ts with the provided code:
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value > 0 ? state.value -= 1 : 0
    }
  }
});

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
})

export const { increment, decrement } = counterSlice.actions

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store

Step 5: Update the App Document
Update _app.tsx to include the Redux Provider:
import Layout from "@/components/layouts/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@/store/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

Step 6: Update the Counter App Component
Replace the content of pages/counter-app.tsx:
import { useSelector } from "react-redux";
import { RootState, useAppDispatch, AppDispatch, increment, decrement } from "@/store/store";

const CounterApp: React.FC = () => {

  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch: AppDispatch = useAppDispatch()

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-400 to-pink-500 flex flex-col justify-center items-center text-white">
      {/* Title */}
      <h1 className="text-6xl font-extrabold mb-6">🤖 Fun Counter App 🎉</h1>

      {/* Funny message */}
      <p className="text-lg font-medium mb-4">
        Current count: {count} {count === 0 ? "🙈 No clicks yet!" : count % 10 === 0 && count !== 0 ? "🔥 You're on fire!" : ""}
      </p>

      {/* Counter Display */}
      <div className="text-6xl font-bold mb-8">
        {count}
      </div>

      {/* Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={() => dispatch(increment())}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full text-lg transition duration-300 shadow-lg transform hover:scale-105"
        >
          Increment 🚀
        </button>
        <button
          onClick={() => dispatch(decrement())}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-full text-lg transition duration-300 shadow-lg transform hover:scale-105"
        >
          Decrement 👎
        </button>
      </div>

      {/* Footer message */}
      <p className="mt-8 text-sm text-white opacity-75">
        Keep clicking, who knows what happens at 100? 😏
      </p>
    </div>
  );
}

export default CounterApp;
Step 7: Update the Header Component
Replace the content of components/layouts/Header.tsx:
import Link from "next/link";
import Button from "../common/Button";
import { usePathname } from "next/navigation";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const Header: React.FC = () => {

  const pathname = usePathname()
  const count = useSelector((state: RootState) => state.counter.value)

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
 
Step 8: Run the Development Server
  npm run dev -- -p 3000

Step 9: Test the Application
Open http://localhost:3000 in your browser

Click on the "Counter App" button/link to navigate to /counter-app

You should see:

A beautifully styled counter app with gradient background

The counter value displayed in both the Header and main component

Fun messages that change based on the count

When you click buttons, both displays update simultaneously

Key Redux Concepts Demonstrated
What You've Achieved with Redux:
Centralized Store: All state lives in a single store

Predictable State Updates: Actions → Reducers → New State

Immutability: Redux Toolkit uses Immer under the hood for safe state updates

Type Safety: Full TypeScript integration with typed hooks

How Redux Works Here:
Store: The single source of truth for your application state

Slice: A collection of Redux reducer logic and actions for a feature

Actions: Plain objects that describe what happened (increment, decrement)

Reducers: Functions that determine how state updates

useSelector: Hook to extract data from the Redux store

useDispatch: Hook to dispatch actions to the store

Redux Data Flow:
Component calls dispatch(increment())

Action {type: 'counter/increment'} is sent to store

Reducer updates the state based on the action

Store notifies all subscribed components

Components re-render with new state via useSelector

Key Differences from Context API
Context API:
Built into React

Good for low-frequency updates

Simpler setup

Can cause unnecessary re-renders

Redux:
External library with dev tools

Optimized for performance

Middleware support for async operations

Better for complex state logic

Time-travel debugging capability

Common Issues to Watch For:
Provider placement: Make sure Redux Provider wraps your app in _app.tsx

Type imports: Ensure all TypeScript types are properly imported

Hook usage: useSelector for reading state, useDispatch for actions

Slice structure: Reducers must be pure functions

Next Steps for Enhancement:
Once this is working, you could:

Add Redux DevTools for debugging

Create multiple slices for different features

Add async actions with createAsyncThunk

Implement selectors for computed state
