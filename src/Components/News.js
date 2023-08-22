import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
  static defaultProps = {
    //Default type of props
    pageSize: 5,
    country: "in",
    category: "General",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    //When intilize a constructor we have to initlize a super()
    super(props);

    this.state = {
      //We use sate when we want to change anything dynamically
      articles: [],
      loading: false,
      page: 1,
      totalResults:0
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )}-Newsmonkey`;
  }
  //Fetch api function
  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c97a905944cd40bdaa2a09e4bf6aa687&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
  }
  async componentDidMount() {
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c97a905944cd40bdaa2a09e4bf6aa687&page=1&pageSize=${this.props.pageSize}`
    // this.setState({loading:true});
    // let data=await fetch(url);
    // let parseData=await data.json();
    // console.log(parseData);
    // this.setState({articles: parseData.articles, totalResults:parseData.totalResults,
    // loading:false})
    this.updateNews();
  }
  handleNextClick = async () => {
    // if( !(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize))){
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c97a905944cd40bdaa2a09e4bf6aa687&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data=await fetch(url);
    // let parseData=await data.json();
    // console.log(parseData);
    // this.setState()
    //   this.setState({
    //     page:this.state.page + 1,
    //     articles: parseData.articles,
    //     loading:false
    //  })
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  handlePrevclick = async () => {
    //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c97a905944cd40bdaa2a09e4bf6aa687&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    // let data=await fetch(url);
    // this.setState({loading:true});
    // let parseData=await data.json();
    // console.log(parseData);
    // this.setState()
    //   this.setState({
    //     page:this.state.page - 1,
    //     articles: parseData.articles,
    //     loading:false
    //  })

    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };
  fetchMoreData = async() => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    this.setState({page : this.setState.page + 1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c97a905944cd40bdaa2a09e4bf6aa687&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
      loading: false,
    })
  };
  render() {
    return (
      <>
        <h2 className="text-center">
          News Monkey - Top headlines on{" "}
          {this.capitalizeFirstLetter(this.props.category)}
        </h2>
        {this.state.loading && <Spinner/>}
        {/* When loading true spinner will visible */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
  next={this.fetchMoreData}
  hasMore={this.state.articles.length < this.state.totalResults} // Change this condition
  loader={<Spinner />}
        > <div className="container">
          <div className="row">
            {this.state.articles.map((element) => {
              return  <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 30) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageurl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                  />
                </div>
              
            })}
          </div>
          </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between my-3">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevclick}
          >
            {" "}
            &larr; Previous{" "}
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}

export default News;
