import React from 'react';
import SearchBar from './components/SearchBar';
import ListItem from './components/ListItem';

class App extends React.Component {
    componentDidMount() {
    }
    render() {
        return (
            <>
            <SearchBar />
            <ListItem />
            </>
        )
    }
}
export default App;