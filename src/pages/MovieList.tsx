import { MovieListType, MovieItemType } from "../types";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks";
import MovieItem from "../components/MovieItem";
import NavFilterMovie from '../components/NavFilterMovie';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MoviePagination from '../components/MoviePagination';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';

export default function MovieList(){
  const listSearchMovies:MovieListType = useAppSelector((state) => state.movie.listSearchMovies);
  const searchKey:string = useAppSelector((state) => state.movie.searchKey);
  const loadingFetch:boolean = useAppSelector((state) => state.movie.loadingFetch);
  const errorFetch:boolean = useAppSelector((state) => state.movie.errorFetch);
  const linkStyle: {
    [key: string]: any;
  } = {
    textDecoration: 'none',
    color: '#000000',
  };
  return(
    <div className="bg-dark">
      <Navbar />
      {/* success fetch movies by search */}
      {!loadingFetch && !errorFetch &&
        <Container>
          {searchKey !== '' && <NavFilterMovie />}
          {listSearchMovies.length > 0 && searchKey !== '' &&
            <>
              <Row>
                {listSearchMovies.map((movie:MovieItemType, i:number) =>
                  <Col lg={3} md={4} key={i} className="mb-4">
                    <Link style={linkStyle} to={`/movie-details/${movie.imdbID}`}>
                      <MovieItem {...movie}/>
                    </Link>
                  </Col>
                )}
              </Row>
            </>
          }
          {listSearchMovies.length === 0 && searchKey === '' &&
            <div className="text-white text-center">Please input value to search movie</div>
          }
          {listSearchMovies.length === 0 && searchKey !== '' &&
            <div className="text-white text-center">
              <div>Oops sorry! Results not found or Too many results</div>
              <div>You can adjust your filters, try using different keywords or explore more hot events below.</div>
            </div>
          }
        </Container>
      }
      <Container
        className={(listSearchMovies.length > 0 && searchKey !== '' && !loadingFetch && !errorFetch)? 'd-block' : 'd-none'}
      >
        <Row>
          <Col className="d-flex justify-content-center mt-4">
            <MoviePagination />
          </Col>
        </Row>
      </Container>

      <Loading />
    </div>
  );
}