import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source} = this.props;
    return (
      <div className="container my-3" key={newsUrl}>
        <div className="card" style={{backgroundColor: this.props.mode==='dark'?'#3e4451':'#fff', color: this.props.mode==='dark'?'#fff':'black', borderColor: this.props.mode==='dark'?'#6c757d':'#adb5bd'}}>
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '88%', zIndex:'1' }}>{source}</span>
          <img src={!imageUrl?"https://etimg.etb2bimg.com/thumb/msid-106072589,imgsize-5390,width-1200,height=765,overlay-ethealth/industry/flu-infections-in-japan-soar-to-warning-level-at-fastest-pace-in-10-years.jpg":imageUrl}alt="Thumbnail" style={{width: "100%", height: "200px"}} /> 
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text mb-1"><small className={`text-${this.props.mode==='dark'?'white-50': 'secondary'}`}>Author - {!author?'Unknown':author}</small></p>
            <p className="card-text mb-3"><small className={`text-${this.props.mode==='dark'?'white-50': 'secondary'}`}>Updated on - {date}</small></p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className={`btn btn-sm btn-outline-${this.props.mode==='light'?'dark':'light'}`}>
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
