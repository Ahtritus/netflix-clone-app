import axios from './axios';
import React, { useEffect, useState } from 'react';
import "./Row.css"
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

function Row({title, fetchUrl, isLargeRow = false}) {

    const [movies, setMovies] = useState([]);

    const base_url = "https://image.tmdb.org/t/p/original";

    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }

        fetchData();

    }, [fetchUrl]);

    const handleTrailer = (movie) => {
        if(trailerUrl){
            setTrailerUrl("")
        }
        else {
            movieTrailer(movie.name || movie.title || movie.original_title || movie.original_name || "").then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
            }).catch((error) => {
                alert(error.message);
            });
        }

    };

    const opts = {
        height: "390",
        width: "100%",
        playerVar: {
            autoplay: 1
        }
    };
    

    return (
        <div className="row">
            <div className = "title">
                <h2>{title}</h2>
            </div>

            <div className="row__posters">
                
                {movies.map(movie => {
                    return <img 
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`} 
                        key={movie.id} 
                        onClick={() => handleTrailer(movie)}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path || movie.poster_path}`} 
                        alt={movie.name || movie.title || movie.original_name} 
                    />
                
                })}                
            </div>   
            <div className="row__trailer">
                
                {trailerUrl && <YouTube videoId = {trailerUrl} opts = {opts} />} 
            </div>
        </div>
    );
    
}

export default Row;

//https://image.tmdb.org/t/p/original/rEm96ib0sPiZBADNKBHKBv5bve9.jpgs