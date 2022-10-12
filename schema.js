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
        Short
        Documentary
        Comedy
        Western
        Adventure
        Romance
        Crime
        Drama
        Action
        Animated
        Historical
        Biography
        Horror
        Fantasy
        Silent
        Sports
        Thriller
        War
        Mystery
        Erotic
        Spy
        Family
        Science_Fiction
        Musical
        Sport
        Noir
        Suspense
        Live_Action
        Disaster
        Teen
        Political
        Satire
        Slasher
        Martial_Arts
        Performance
        Superhero
        Independent
        Dance
        Supernatural
        Legal
        Found_Footage
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
        directedMovies: [Movie!]!
    }
    
    type NonActorDirector implements Person {
        ${personFields}
        directedMovies: [Movie!]!
    }

    union Director = ActorDirector | NonActorDirector
    
    type Movie {
        title: String!
        directors: [Director!]!
        cast: [Actor!]!
        year: Date!
        duration: Int
        genres: [Genre!]!
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