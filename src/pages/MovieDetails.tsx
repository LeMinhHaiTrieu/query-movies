import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useParams, useHistory } from "react-router-dom";
import { fetchMoviesDetailsAPI } from '../redux/movieSlice';
import { MovieItemType } from "../types";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Loading from "../components/Loading";

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const movieDetails:MovieItemType = useAppSelector((state) => state.movie.movieDetails);
  const loadingFetch:boolean = useAppSelector((state) => state.movie.loadingFetch);
  const errorFetch:boolean = useAppSelector((state) => state.movie.errorFetch);
  const iconBackStyle: {
    [key: string]: any;
  } = {
    fontSize: '40px',
    position: 'absolute',
    top: '-70px',
    cursor: 'pointer',
  };
  const iconAvatarStyle: {
    [key: string]: any;
  } = {
    maxWidth: '100%',
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchMoviesDetailsAPI(id));
    }
  }, [id, dispatch])

  return (
    <>
      {!loadingFetch && !errorFetch &&
        <Container className="text-white position-relative">
          <div style={iconBackStyle} onClick={() => history.push('/')}>&#8592;</div>
          <Row>
            <Col md={4}>
              <h2 className="text-warning d-md-none text-center mb-4">{movieDetails.Title}</h2>
              <div className="text-md-start text-center">
                <img style={iconAvatarStyle} src={movieDetails.Poster} alt="" />
              </div>
              <p className="pt-3">{movieDetails.Country}</p>
              <p>Ratings: {movieDetails?.Ratings?.[0]?.Value}</p>
              <p>Year: {movieDetails.Year}</p>
            </Col>
            <Col md={8}>
              <h2 className="text-warning d-md-block d-none">{movieDetails.Title}</h2>
              <p className="pt-3">{movieDetails.Type} - {movieDetails.Runtime} </p>
              <p>Actors: {movieDetails.Actors}</p>
              <p>-----------------------------</p>
              <p>{movieDetails.Plot}</p>
            </Col>
          </Row>
        </Container>
      }
      <Loading />
    </>
  );
};

export default MovieDetails;
