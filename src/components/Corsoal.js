import React from 'react'
import Card from './Card'

const Corsoal = ({data}) => {


  return (
    <div className='d-flex'>
        {data.map((item, index) => {
            return (
                <Card key = {index} data = {item}/>
            )
        })}
    </div>
  
  )
}

export default Corsoal