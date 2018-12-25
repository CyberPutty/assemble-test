import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      dropdown: false,
      bSort:[],
      aSort:[]

    }

  }

  componentDidMount() {

    fetch("https://www.googleapis.com/books/v1/volumes?q=tech]").then((res) => res.json()).then((data) => {
     
      let sorted = data.items.sort((a, b) => {
        return a.volumeInfo.title > b.volumeInfo.title
      });
      console.log(sorted);
      let aSort=sorted.filter((item)=>{
        const a=/[A-M]/g;
        let compare= item.volumeInfo.title.charAt(0);
        if(compare.match(a)!== null){
          return item;
        }
        else{
          return;
        }
      });
      let bSort=sorted.filter((item)=>{
        const a=/[N-Z]/g;
        let compare= item.volumeInfo.title.charAt(0);
        if(compare.match(a)!== null){
          return item;
        }
        else{
          return;
        }
      });
      console.log(aSort,bSort);
      this.setState({ books: sorted, aSort: aSort, bSort: bSort });

    });


  }

  handleDropDown = () => {
    if (this.state.dropdown === false) {
      this.setState({ dropdown: true });
    }
    else {
      this.setState({ dropdown: false });
    }
  }




  render() {
    return (
      <div className="App">
        <header className="">

          <div className="logo">Assemble Books</div>

        </header>
        <div className="library">
          <div className="library-category">
            Titles A-M
        </div>
          <div className="library-flex">
            {this.state.aSort.map((item, index) => {
              if (index < 5) {
                return (<div className="library-book">
                  <img src={item.volumeInfo.imageLinks.thumbnail} alt="" />
                  <div className="credits">
                    <h2 className="library-book-title">{
                      item.volumeInfo.title
                    }</h2> <p className="library-book-title">{
                      "By " + item.volumeInfo.authors[0]
                    }</p>
                  </div>
                </div>);
              }
              if (index >= 5 && this.state.dropdown === true) {
                return (<div className="library-book">
                  <img src={item.volumeInfo.imageLinks.thumbnail} alt="" />
                  <div className="credits">
                    <h2 className="library-book-title">{
                      item.volumeInfo.title
                    }</h2>
                    <p className="library-book-title">{
                      "by " + item.volumeInfo.authors[0]
                    }</p>
                  </div>
                </div>);
              }
            })}
          </div>
          <h4>Show More</h4>
          <button className="dropdown" onClick={() => {
            this.handleDropDown();
          }}>{this.state.dropdown ? "-" : "+"}
          </button>
          <div className="library-category">
            Titles N-Z
        </div>
          <div className="library-flex">
            {this.state.bSort.map((item, index) => {
              if (index < 5) {
                return (<div className="library-book">
                  <img src={item.volumeInfo.imageLinks.thumbnail} alt="" />
                  <div className="credits">
                    <h2 className="library-book-title">{
                      item.volumeInfo.title
                    }</h2> <p className="library-book-title">{
                      "By " + item.volumeInfo.authors[0]
                    }</p>
                  </div>
                </div>);
              }
              if (index >= 5 && this.state.dropdown === true) {
                return (<div className="library-book">
                  <img src={item.volumeInfo.imageLinks.thumbnail} alt="" />
                  <div className="credits">
                    <h2 className="library-book-title">{
                      item.volumeInfo.title
                    }</h2>
                    <p className="library-book-title">{
                      "by " + item.volumeInfo.authors[0]
                    }</p>
                  </div>
                </div>);
              }
            })}
          </div>
        </div>
        <footer>
          <div className="logo">Assemble Books</div>
        </footer>
      </div>
    );
  }
}

export default App;
