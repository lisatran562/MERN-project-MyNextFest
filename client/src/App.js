
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Index from './views/Index'
import Dashboard from './views/Dashboard'  
import AddShow from './views/AddShow';
import Show from './views/Show'
import EditShow from './views/EditShow';
import ShowsNearMe from './views/ShowsNearMe';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path='/' element={<Index/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/addshow' element={<AddShow/>}/>
        <Route path='/shows/:id' element={<Show/>}/>
        <Route path='/shows/edit/:id' element={<EditShow/>}/>
        <Route path='/showsnearme' element={<ShowsNearMe/>}/>
      </Routes>
    </div>
  );
}

export default App;
