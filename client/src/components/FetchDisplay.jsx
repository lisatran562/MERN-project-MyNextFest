import React from 'react'

const FetchDisplay = (props) => {
    const {listShows} = props

    return (
        <div className='mt-5'>
            {
                listShows?
                listShows.map((listShows, i) => {
                    return(
                        <p key={i} class='text-light'>{listShows.displayName}</p>
                    )
                })
                : "nothing here"
            }
        </div>
    )
}

export default FetchDisplay