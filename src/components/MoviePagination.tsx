import {useState, useEffect} from 'react';
import {useDispatch} from "react-redux";
import ReactPaginate from 'react-paginate';
import { useAppSelector } from "../hooks";
import {fetchMoviesAPI, arrayTypeFilter} from "../redux/movieSlice";

const itemsPerPage = 10;
const MoviePagination = () => {
    const dispatch = useDispatch();
    const totalResults:string = useAppSelector((state) => state.movie.totalResults);
    const searchKey:string = useAppSelector((state) => state.movie.searchKey);
    const typeFilter:arrayTypeFilter = useAppSelector((state) => state.movie.typeFilter);
    const [items, setItems] = useState<Array<number>>([0]);
    const [pageCount, setPageCount] = useState<number>(1);

    useEffect(() => {
      setItems(Array.from(Array(Number(totalResults)).keys()));
    }, [totalResults]);

    useEffect(() => {
      setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [items]);

    // Invoke when user click to request another page.
    const handlePageClick = (event:any) => {
      dispatch(fetchMoviesAPI({
        s: searchKey,
        type: typeFilter,
        page: event.selected + 1,
      }));
    };

  
    return (
      <ReactPaginate
          className='pagination flex-wrap'
          nextLabel=">>"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="<<"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
      />
    );
  }
  
export default MoviePagination;
