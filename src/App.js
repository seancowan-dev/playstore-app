import React, { Component } from 'react';
import Game from './game';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      sort: "",
      genre: "",
      games: [],
      error: ""
    }
  };

  setGenre(genre) {
    this.setState({
      genre
    });
  }

  setSort(sort) {
    this.setState({
      sort
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    
    const baseURL = "http://localhost:8000/playstore";
    const params = [];

    if (this.state.genre) {
      params.push(`genre=${this.state.genre}`);
    }
    if (this.state.sort) {
      params.push(`sort=${this.state.sort}`);
    }

    const query = params.join('&');
    const url = `${baseURL}?${query}`;

    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          games: data,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          error: 'Sorry, could not get books at this time.'
        });
      })
  };

  render() {

    const titles = this.state.games.map((game, i) => {
      return <Game {...game} key={i} />
    });

    return(<>
      <form className="search-form" onSubmit={e => this.handleSubmit(e)}>
        <select className="genre-select" onChange={e => this.setGenre(e.target.value)}>
          <option>select</option>
          <option>Action</option>
          <option>Puzzle</option>
          <option>Strategy</option>
          <option>Casual</option>
          <option>Arcade</option>
          <option>Card</option>
        </select>
        <select className="sort-select" onChange={e => this.setSort(e.target.value)}>
          <option>select</option>
          <option>rating</option>
          <option>app</option>
        </select>

        <input type="submit" name="submit" className="submit"></input>
      </form>
      {titles}
      </>
    );
  };
}

export default App;
