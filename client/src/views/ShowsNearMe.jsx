import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import FetchDisplay from '../components/FetchDisplay'

const ShowsNearMe = () => {
    const [loggedInUser, setLoggedInUser] = useState({})
    const [listShows, setListShows] = useState([])



    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/getloggedinuser`, {withCredentials:true})
            .then(res => {
                console.log('res when getting logged in user')
                if(res.data.results){
                    // this means the user is logged in and can access this page
                    setLoggedInUser(res.data.results)
                }
                
            })
            .catch(err => {               
                // this means someone who is not logged tried to access the dashboard
                console.log('error when getting logged in user')
                navigate('/')
            })
    }, [])

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(`https://api.songkick.com/api/3.0/metro_areas/17835/calendar.json?apikey=io09K9l3ebJxmxe2`)
            .then(res => {
                // console.log(res.data.resultsPage.results.event)
                setListShows(res.data.resultsPage.results.event)
            })
            .catch(err => {
                console.log(err)
            })
        }
        fetchData()
    }, [])


    const logout = (e) => {
        axios.get('http://localhost:8000/api/users/logout', {withCredentials:true})
            .then(res => {
                navigate('/')
            })
            .catch(err => {
                console.log('Error logging out', err)
            })
    }

    return (
        <div className='nearme'>
            <div className='nav d-flex justify-content-around'>
                <div className='navLeft mt-5'>
                    <Link to='/faveArtists' className='btn btn-sm btn-light me-3'>My Fave Artists</Link>
                    <Link to='/myshows' className='btn btn-sm btn-light me-3'>My Shows & Festivals</Link>
                    {/* <Button onClick={handleClick} className='btn btn-sm btn-light'>Music Player</Button> */}
                </div>
                <div className='navRight mt-5'>
                    <Link to='/dashboard' className='btn btn-secondary btn-sm'>Home</Link>
                    <button onClick={logout} className='btn btn-info btn-sm ms-3'>Sign Out</button>
                </div>
            </div>
            <h2 className='mt-5 text-light'>Welcome {loggedInUser.firstName}!</h2>
            <h3 className='mt-3 text-center text-light'>Music Events Near You</h3>
            <div className='mt-3 text-light'>
                <FetchDisplay listShows={listShows}/>
            </div>
        </div>
    )
}

export default ShowsNearMe