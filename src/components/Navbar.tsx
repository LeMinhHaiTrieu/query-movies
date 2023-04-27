import React, { ChangeEvent } from 'react';
import {useDispatch} from "react-redux";
import {setSearchKey, fetchMoviesAPI, paramsQuery} from "../redux/movieSlice";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

type Timeout = ReturnType<typeof setTimeout>;

export default function NavBar() {
    const dispatch = useDispatch();
    const [search, setSearch] = React.useState("");
    const [timer, setTimer] = React.useState<Timeout | null>(null)

    const getListSearch = (queries: paramsQuery) => {
      dispatch(fetchMoviesAPI({...queries}));
      dispatch(setSearchKey(queries.s || ''));
    };

    const handleSetSearch = (event:ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        // wait user finish input
        if (timer) {
          clearTimeout(timer);
        }
        const newTimer = setTimeout(() => {
          if (event.target.value.length) {
            getListSearch({
              s: event.target.value,
            });
          } else {
            dispatch(setSearchKey(event.target.value));
          }
        }, 1000);
        setTimer(newTimer);
    };

    return(
        <Navbar className='py-3 bg-dark' fixed="top">
          <Container>
            <Row className="justify-content-md-center w-100">
              <Col xs>
                <input
                  type="text" id="simple-search"
                  className="input-group p-2"
                  placeholder="Search..."
                  value={search}
                  onChange={handleSetSearch}
                />
              </Col>
            </Row>
          </Container>
        </Navbar>
    );
}