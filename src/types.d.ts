export type MovieItemType = {
  Poster: string;
  Type: string;
  Year: string;
  Title: string;
  [key: string]: any;
};

export type MovieListType = Array<MovieItemType> | Array<>;

