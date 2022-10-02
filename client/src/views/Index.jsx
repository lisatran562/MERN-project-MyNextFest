import React from 'react'
import RegForm from '../components/RegForm'
import LoginForm from '../components/LoginForm'



const Index = () => {
    
    return (
        <div className='container '>
                <div className='d-flex justify-content-center align-items-center'>
                    <img src='https://coachellavalley.com/wp-content/uploads/2016/03/IMG_2007-890x395_c.jpg' width='60%'/>
                </div>
            <h1 className='text-center'>My Next Fest</h1>
            <div className='mt-5 d-flex justify-content-between'>
                <div className='col-4'>
                    <RegForm/>
                </div>
                <div className='col-4'>
                    <LoginForm/>
                </div>
            </div>
        </div>
    )
}

export default Index

