
export interface Movie {
    _id: String,
    title: String,
    poster: String,
    plot: String,
    fullplot: String,
    type: String,
    rated: String,
    lastUpdated: Date,
    year: Number,
    runtime: Number,
    imdb: any,
    tomatoes: any,
    cast: [],
    countries: [],
    genres: [],
    directors: []
}

export interface MoviePresentation {
    _id: String,
    title: String,
    year: String,
    countries: [],
    genres: [],
    directors: []
}