import { BrowserRouter as Router , Routes, Route, Navigate} from 'react-router-dom'
import './App.scss'
import ConfigPage from './pages/config/config'
import Sumadora from './pages/sumadora/sumadora'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>          
          <Route path='' element={<Sumadora/>} />
          <Route path='config' element={<ConfigPage/>} />
          <Route path='*' element={<Navigate to='' replace />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
