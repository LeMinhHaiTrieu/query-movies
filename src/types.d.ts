export type BookState = {
  id: string;
  title: string | undefined;
  author: string | undefined;
};

export type MovieItemType = {
  Poster: string;
  Type: string;
  Year: string;
  Title: string;
  [key: string]: any;
};

export type MovieListType = Array<MovieItemType> | Array<>;

