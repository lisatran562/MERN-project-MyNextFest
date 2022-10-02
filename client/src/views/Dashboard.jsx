import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

const Dashboard = () => {
    const [shows, setShows] =  useState([])
    const [loggedInUser, setLoggedInUser] = useState({})
    const [listShows, setListShows] = useState([])

    const navigate = useNavigate();


    useEffect(() => {
        axios.get('http://localhost:8000/api/users/getloggedinuser', {withCredentials:true})
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

        axios.get('http://localhost:8000/api/shows')
            .then(res => setShows(res.data))
            .catch(err => console.log(err))

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
        <div className='dashimage text-center p-5'>
            <div className='nav d-flex justify-content-evenly mt-3'>
                <div className='navLeft'>
                    <Link to='/faveArtists' className='btn btn-sm btn-light me-3'>My Fave Artists</Link>
                    <Link to='/myshows' className='btn btn-sm btn-light me-3'>My Shows & Festivals</Link>
                    {/* <Button onClick={handleClick} className='btn btn-sm btn-light'>Music Player</Button> */}
                </div>
                <div className="search">
                    <Link to='/showsnearme' className='btn btn-sm btn-light'>Search Shows Near Me</Link>
                </div>
                <div className='navRight'>
                    {/* <Link to='/dashboard' className='btn btn-secondary btn-sm'>Home</Link> */}
                    <button onClick={logout} className='btn btn-info btn-sm ms-3'>Sign Out</button>
                </div>
            </div>
            <h2 className='mt-3 text-light'>Welcome {loggedInUser.firstName}!</h2>
            <h1 className='text-center text-light mt-5'>Upcoming Shows & Festivals</h1>
            <div className='d-flex'>
                <div className=''>
                    <Link to={`/addshow`} className='btn btn-dark btn-sm'>Add a Show</Link>
                </div>
                <div>
                    <div className='d-flex flex-row flex-wrap mt-5'>
                        {
                            shows.map((eachShow, i) => {
                                return(
                                    <div className='card-body bg-gradient p-2 ms-3 mt-3 text-center rounded' key={i}>
                                        <Link to={`/shows/${eachShow._id}`} className='text-light '>{eachShow.name}</Link>
                                        <p className='text-light'>{eachShow.date}</p>
                                        <p className='text-light'>{eachShow.location}</p>
                                        <Link to={`/shows/${eachShow._id}`} className='btn btn-light btn-sm'>Let's Go!</Link>
                                    </div>                                
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard