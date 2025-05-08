import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserHome from './pages/UserHome'
import UserSignUpPage from './pages/UserSignUpPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {
  const [count, setCount] = useState(0)
  const queryclient = new QueryClient();
  return (
    <QueryClientProvider client={queryclient}>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        {/* <UserHome/> */}
        <UserSignUpPage/>
      </div>
    </QueryClientProvider>
  )
}

export default App
