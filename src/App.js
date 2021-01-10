import React, { useState, useEffect } from 'react'
import MovieList from './components/MovieList'
import MovieListHeading from './components/MovieListHeading'
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites'
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';


function App() {

    const [movies, setMovies] = useState([])
    const [searchValue, setSearchValue] = useState("")

    const getMovieRequest = async (searchValue) => {
        const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=87ab0504`

        const response = await fetch(url)
        const responseJson = await response.json()

        if (responseJson.Search) {
            setMovies(responseJson.Search)
        }
    }

    useEffect(() => {
        getMovieRequest(searchValue)
    }, [searchValue])

    return (
        <div className="container-fluid movie-app">
            <div className="row d-flex align-items-center mt-4 mb-4">
                <MovieListHeading heading="Movies" />
                <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
            </div>
            <div className="row">
                <MovieList movies={movies} favouriteComponent={AddFavourites} />
            </div>            
        </div>
    );
}

export default App;
