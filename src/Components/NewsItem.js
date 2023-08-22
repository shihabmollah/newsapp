import React, { Component } from 'react'

export class NewsItem extends Component {
  
  render() {
    
    let {title,description,imageurl,newsUrl,author,date}=this.props;//This props is give to the News
    return (
      <div className='my-3'>
        <div className="card" 
        >
        <img src={!imageurl?"https://static.toiimg.com/thumb/msid-89223698,imgsize-49966,width-400,resizemode-4/89223698.jpg":imageurl} className="card-img-top" alt="..."/>
        <div className="card-body">
        
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className='card-text'><small className='text-muted'>by {!author?"Unknown":author} on:-{new Date(date).toGMTString()}</small></p>
          <a href={newsUrl} target="_blank"className="btn btn-sm btn-dark">Go somewhere</a>
        </div>
      </div>
      </div>
    )
  }
}

export default NewsItem
