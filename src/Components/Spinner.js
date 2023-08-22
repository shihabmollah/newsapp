import React, { Component } from 'react';
import loading from './loading.gif';

export class Spinner extends Component {
  render() {
    const gifStyle = {
    height: '50px', // You can adjust the height value as needed
    };

    return (
      <div className='text-center '>
        <img src={loading} alt="loading" style={gifStyle} />
      </div>
    );
  }
}

export default Spinner;
