const personFields = `
    name: String!
    surname: String!
    birthday: Date!
`

const actorFields = `
    appearedIn: [Movie!]!
`

const schema = `
    scalar Date
    
    enum Genre {
        SCI_FI
        FANTASY
        HORROR
    }
    
    interface Person {
        ${personFields}
    }
    
    interface ActorInterface {
        ${actorFields}
    }
    
    type Actor implements Person & ActorInterface {
        ${personFields}
        ${actorFields}
    }
    
    type ActorDirector implements Person & ActorInterface {
        ${personFields}
        ${actorFields}
        directed: [Movie!]!
    }
    
    type NonActorDirector implements Person & ActorInterface {
        ${personFields}
        ${actorFields}
        bo: String
    }

    union Director = Actor | NonActorDirector
    
    type Movie {
        title: String!
        directors: [Director!]!
        cast: [Actor!]!
        year: Date!
        duration: Int
        genre: Genre
    }
    
    type Query {
        highlightedMovies: [Movie!]!,
        movies(page: Int! = 0): [Movie!]!
    }
    
    type Mutation {
        addMovie(title: String!): Movie!
    }
`
module.exports = schema;