import { useAppSelector } from "../hooks";
import Spinner from 'react-bootstrap/Spinner';

export default function Loading(){
  const loadingFetch:boolean = useAppSelector((state) => state.movie.loadingFetch);
  const errorFetch:boolean = useAppSelector((state) => state.movie.errorFetch);
  return(
    <div className="bg-dark">
      {loadingFetch &&
        <div className="d-flex justify-content-center">
          <Spinner className="bg-warning p-1" animation="grow" />
          <Spinner className="bg-warning p-1" animation="grow" />
          <Spinner className="bg-warning p-1" animation="grow" />
        </div>
      }

      {errorFetch &&
        <div>Error server!! Please try again in a few minutes</div>
      }
    </div>
  );
}