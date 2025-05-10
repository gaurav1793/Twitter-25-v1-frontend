
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Router from './Router';


function App() {

  const queryclient = new QueryClient();

  return (
    <QueryClientProvider client={queryclient}>
      <div className="min-h-screen min-w-full flex justify-center">
        <Router/>
      </div>
    </QueryClientProvider>
  )
}

export default App
