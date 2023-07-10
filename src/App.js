import { Component } from 'react';
import './App.css';
import SearchBox from './components/searchbox';
import Scroll from './components/scroll';
import ErrorBoundary from './components/errorboundary';
import CardList from './components/cardlist';

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfield: ''
    }
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => this.setState({ robots: users }));
  }


  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
  }

  render() {
    const filteredRobots = this.state.robots.filter(robots => {
      return (
        robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
      )
    })

    if (this.state.robots.length === 0) {
      return (<h1> Loading... </h1>)
    } else {
      return (
        <div className='tc'>
          <h1 className='f1'> RoboFriends </h1>
          <SearchBox searchChange={this.onSearchChange} />
          <Scroll>
            <ErrorBoundary>
              <CardList robots={filteredRobots} />
            </ErrorBoundary>
          </Scroll>
        </div>
      )
    }
  }
}

export default App;
