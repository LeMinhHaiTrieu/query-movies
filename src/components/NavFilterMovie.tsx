import {useDispatch} from "react-redux";
import { useAppSelector } from "../hooks";
import {fetchMoviesAPI, arrayTypeFilter, setTypeFilter} from "../redux/movieSlice";
import Button from 'react-bootstrap/Button';

const typeMovie:arrayTypeFilter[] = ['movie', 'series', 'episode'];

export default function NavFilterMovie() {
    const dispatch = useDispatch();
    const searchKey:string = useAppSelector((state) => state.movie.searchKey);
    const typeFilter:arrayTypeFilter = useAppSelector((state) => state.movie.typeFilter);

    const handleClickButtonToFilter = (type: arrayTypeFilter) =>{
        dispatch(setTypeFilter(type));
        dispatch(
            fetchMoviesAPI({
                s: searchKey,
                type,
            })
        );
    }

    return(
        <div className='py-3 bg-dark'>
            {typeMovie.map((item) =>
                <Button
                    className='mx-2'
                    variant={typeFilter !== item ? 'light' : 'warning'}
                    key={item}
                    onClick={() => handleClickButtonToFilter(item)}
                >
                    {item}
                </Button>
            )}
        </div>
    );
}