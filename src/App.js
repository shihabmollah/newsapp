import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import News from './Components/News';

export default class App extends Component {
  pageSize=15;
  render() {
    return(
      <div className="App">
    <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<News key="sports" pageSize={this.pageSize} country="in" category="sports" />}  />
          <Route exact path="/Business" element={<News  key="business" pageSize={this.pageSize} country="in" category="business" />} />
          <Route exact path="/Entertainment" element={<News key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" />} />
          <Route exact path="/General" element={<News key="general" pageSize={this.pageSize} country="in" category="general" />} />
          <Route exact path="/Health" element={<News key="health" pageSize={this.pageSize} country="in" category="health" />} />
          <Route exact path="/Science" element={<News key="science" pageSize={this.pageSize} country="in" category="science" />} />
          <Route exact path="/Sports" element={<News key="sports" pageSize={this.pageSize} country="in" category="sports" />} />
          <Route exact path="/Technology" element={<News key="technology" pageSize={this.pageSize} country="in" category="technology" />} />
        </Routes>
        {/* In this process dont remount because here the news component not chnge but ht category of the api will change but compiler not under stand this so thats why we need to do forcefull remount  *** here we use a unique key for every elements */}
    </Router>
      </div>
    );
  };
}


