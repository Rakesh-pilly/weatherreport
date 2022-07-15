import React from 'react'

const InputBox = () => {
    const [search, setSeach] = React.useState('');
    const inputSearch = (e)=> {
        
        setSeach(e.target.value);
    }
  return (
    <div>

        <input className='form-control' type = "text" value = {search} onChange = {(e)=> inputSearch(e)} />
        {search}
    </div>

  )
}

export default InputBox