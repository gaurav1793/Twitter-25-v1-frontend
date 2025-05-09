
import './App.css'
import UserHome from './pages/UserHome'
import UserSignInPage from './pages/UserSignInPage';
import UserSignUpPage from './pages/UserSignUpPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Router from './Router';

function App() {

  const queryclient = new QueryClient();
  return (
    <QueryClientProvider client={queryclient}>
      <div className="min-h-screen min-w-full flex justify-center">
        {/* <UserSignInPage/> */}
        {/* <UserSignUpPage/> */}
        <Router/>
      </div>
    </QueryClientProvider>
  )
}

export default App
