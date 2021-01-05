import React from 'react';
import img from './spinner.gif';

const style = {
    width: '100%',
    height: '283px'
}

const Spinner = () => {
    return (
        <img src={img} style={style} alt="spinner"></img>
    )
}

export default Spinner
