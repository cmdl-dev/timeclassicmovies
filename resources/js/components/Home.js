import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import SingleVideo from './singles/SingleVideo';

const Home = () => {
    // const [token, setToken] = useState(localStorage['appState'] ? JSON.parse(localStorage['appState']).user.auth_token : '');
    const [frontPageMovies, setFrontPageMovies] = useState({});
    useEffect(() => {
        var url = '/api/movies/filteredByGenre';
        axios
            .get(url)
            .then(response => {
                return response.data;
            })
            .then(json => {
                setFrontPageMovies({ ...json.data });
            });
    }, []);

    var popularGenres = Object.keys(frontPageMovies);
    var limit = 6;
    return (
        <div id="home-page" className="container">
            <div className="hero">
                <img src="https://i.pinimg.com/originals/3a/a7/29/3aa729e58ccc5ade93239ff883235551.jpg" />
            </div>
            <div className="film-section">
                {popularGenres.map((genre, index) => {
                    return (
                        <div key={index} className="genre-section">
                            <div className="genre">
                                <h1>{genre}</h1>
                                <Link to={`/movie/genre/${genre}`}>View all</Link>
                            </div>
                            <div className="row">
                                {frontPageMovies[genre].map((value, index) => {
                                    if (index < limit) {
                                        return <SingleVideo id={value.id} posterLocation={value.poster_location} title={value.title} />;
                                    }
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default Home;
