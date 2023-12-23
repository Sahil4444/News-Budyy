import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {
  static propNames = {
    country: "in",
    pageSize: 8,
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
  };

  capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
  }

  constructor(props) {
    super(props);
    console.log("News construcotr");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    };
    document.title = `${this.capitalize(this.props.category)} - NewsBuddy`;
  }

  async urlUpdate() {
    let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=472d6f0fb5494c17aa0583dff3d8caa8&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    this.urlUpdate();
  }

  fetchMoreData = async() => {
    let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=472d6f0fb5494c17aa0583dff3d8caa8&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
    this.setState({page: this.state.page +1})
  };

  render() {
    return (
      <div
        className="container-fluid py-5"
        style={{
          backgroundColor: this.props.mode === "dark" ? "#3e4451" : "#fff",
        }}
      >
        <div
          className="container mb-4"
          style={{
            marginTop: "100px",
            color: this.props.mode === "light" ? "black" : "#fff",
          }}
        >
          <h3>Top Headlines</h3>
          <hr className="m-0" />
          <InfiniteScroll dataLength={this.state.articles.length} next={this.fetchMoreData} hasMore={this.state.articles.length !== this.state.totalResults} loader={<Spinner />}>
            <div className="container">
              <div className="row ">
                {!this.state.loading &&
                  this.state.articles.map((element) => {
                    return (
                      <div className="col-md-4" key={element.url}>
                        <NewsItem
                          title={element.title ? element.title.slice(0, 30) : ""}
                          description={
                            element.description
                              ? element.description.slice(0, 90)
                              : "There is no description provided!"
                          }
                          imageUrl={element.urlToImage}
                          newsUrl={element.url}
                          mode={this.props.mode}
                          author={element.author}
                          date={new Date(element.publishedAt).toGMTString()}
                          source={element.source.name}
                        />
                      </div>
                      
                    );
                  })}
              </div>

            </div>
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

export default News;
