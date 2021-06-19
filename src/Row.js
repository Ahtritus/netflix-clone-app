import axios from './axios';
import React, { useEffect, useState } from 'react';
import "./Row.css"

function Row({title, fetchUrl, isLargeRow = false}) {

    const [movies, setMovies] = useState([]);

    const base_url = "https://image.tmdb.org/t/p/original";

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }

        fetchData();

    }, [fetchUrl]);


    

    const images = movies.map(movie => {
        // eslint-disable-next-line jsx-a11y/alt-text
        return <img 
                className={`row__poster ${isLargeRow && "row__posterLarge"}`} 
                key={movie.id} 
                src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path || movie.poster_path}`} 
                alt={movie.name || movie.title || movie.original_name} 
                />
     });

    return (
        <div className="row">
            <div className = "title">
                <h2>{title}</h2>
            </div>

            <div className="row__posters">
                
                {images}
                
            </div>   
        </div>
    );
    
}

export default Row;

//https://image.tmdb.org/t/p/original/rEm96ib0sPiZBADNKBHKBv5bve9.jpgs