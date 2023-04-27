import { MovieItemType } from "../types";
import Card from 'react-bootstrap/Card';

const MovieItem = (props: MovieItemType) => {
    const {Poster, Year, Type, Title} = props;
    return (
        <Card className="h-100">
            <Card.Img variant="top" src={Poster}/>
            <Card.Body>
                <Card.Title>{Title}</Card.Title>
                <Card.Text>
                    {Type} • ${Year}
                </Card.Text>
            </Card.Body>
        </Card>
    )
};

export default MovieItem;