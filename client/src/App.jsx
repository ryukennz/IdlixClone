import { RouterProvider } from 'react-router-dom'
import './App.css'
import router from './Router'

function App() {

  return (
    <div className='mt-10'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
