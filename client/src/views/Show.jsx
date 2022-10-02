import React, {useState, useEffect} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'

const Show = () => {
    const [loggedInUser, setLoggedInUser] = useState({})
    const [show, setShow] = useState()

    const navigate = useNavigate();
    const {id} = useParams()

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
        axios.get(`http://localhost:8000/api/shows/${id}`, {withCredentials:true})
            .then(res => setShow(res.data))
            .catch(err => console.log(err))
    }, []);

    const logout = (e) => {
        axios.get('http://localhost:8000/api/users/logout', {withCredentials:true})
            .then(res => {
                navigate('/')
            })
            .catch(err => {
                console.log('Error logging out', err)
            })
    }

    const handleDelete = () => {
        // delete from db
        // redirect
        axios.delete(`http://localhost:8000/api/shows/${id}`)
            .then(res => navigate('/dashboard'))
            .catch(err => console.log(err))
    }

    return (
        <div className='showimage mt-3'>
            <div className='nav d-flex justify-content-evenly p-5'>
                <div className='navLeft'>
                    <Link to='/faveArtists' className='btn btn-sm btn-light me-3'>My Fave Artists</Link>
                    <Link to='/myshows' className='btn btn-sm btn-light me-3'>My Shows & Festivals</Link>
                    {/* <Button onClick={handleClick} className='btn btn-sm btn-light'>Music Player</Button> */}
                </div>
                <div className='navRight'>
                    <Link to='/dashboard' className='btn btn-secondary btn-sm'>Home</Link>
                    <button onClick={logout} className='btn btn-info btn-sm ms-3'>Sign Out</button>
                </div>
            </div>
            <h2 className='mt-3 text-light'>Welcome {loggedInUser.firstName}!</h2>
            <div>
                {
                    show?
                    <div>
                        <div>
                            <h1 className='mt-5 text-center text-light'>{show.name}</h1>
                            <h2 className='mt-2 text-center text-light'>{show.location}</h2>
                            <h3 className='mt-2 text-center text-light'>{show.date}</h3>
                            <h4 className='text-center text-light'>{show.artist}</h4>
                        </div>
                        <div className='d-flex justify-content-evenly mt-5'>
                            <Link to={`/shows/edit/${id}`} className='btn btn-primary'>Update</Link>
                            <button onClick={handleDelete} className='btn btn-danger'>Delete</button>
                        </div>
                    </div>:
                    <h2>Wrong id</h2>
                }
            </div>
        </div>
    )
}

export default Show