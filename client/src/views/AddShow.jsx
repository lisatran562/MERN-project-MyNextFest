import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'


const AddShow = () => {
    const [loggedInUser, setLoggedInUser] = useState({})
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [date, setDate] = useState('')
    const [artist, setArtist] = useState('')
    const [errors, setErrors] = useState([])

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

    const logout = (e) => {
        axios.get('http://localhost:8000/api/users/logout', {withCredentials:true})
            .then(res => {
                navigate('/')
            })
            .catch(err => {
                console.log('Error logging out', err)
            })
    }

    const addHandler = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/api/addshow`, {name, location, date, artist}, {withCredentials: true})
            .then(res => navigate('/dashboard'))
            .catch(err => {
                const errMsgArr = []
                const errResponse = err.response.data.errors
                for(const eachKey in errResponse) {
                    errMsgArr.push(errResponse[eachKey].message)
                }
                setErrors(errMsgArr)
            })
        }

    return (
        <div className='addimage mt-5'>
            <div className='nav d-flex justify-content-evenly mt-5'>
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
            <h2 className='mt-5 text-light'>Welcome {loggedInUser.firstName}!</h2>
            <div className="d-flex justify-content-center">
                
            <form onSubmit={addHandler} className='form-group mt-5'>
                <div className='col-10'>
                    <label className='form-label text-light'>Show/Festival Name:</label>
                    <input type='text' name='name' value={name} onChange={e=> setName(e.target.value)} className='form-control'/>
                </div>
                <div className='col-10'>
                    <label className='form-label text-light'>Location:</label>
                    <input type='text' name='location' value={location} onChange={e=> setLocation(e.target.value)} className='form-control'/>
                </div>
                <div className='col-10'>
                    <label className='form-label text-light'>Dates:</label>
                    <input type='text' name='dates' value={date} onChange={e=> setDate(e.target.value)}className='form-control'/>
                </div>
                <div className='col-10'>
                    <label className='form-label text-light'>Artist(s):</label>
                    <input type='text' name='dates' value={artist} onChange={e=> setArtist(e.target.value)}className='form-control'/>
                </div>
                <button type='submit' className='btn btn-secondary mt-3'>Add</button>
            </form>
            </div>
            {
                errors.map((err, i) => {
                    return(
                        <p style={{color: "red"}} key={i}>{err}</p>
                    )
                })
            }
        </div>
    )
}

export default AddShow