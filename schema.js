const personFields = `
    name: String!
    surname: String!
    birthday: Date!
`

const actorFields = `
    appearedIn: [Movie!]!
`

const directorFields = `
    directedMovies: [Movie!]!
`

const schema = `
    scalar Datetime
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
    
    # Describe here Actor type (use the variables personFields and actorFields)
    type Actor implements Person & ActorInterface { `+/*TODO Exercise 3.1a*/+`
        ${personFields}
        ${actorFields}
    }
    
    # Describe here ActorDirector type (use the variables personFields, actorFields and directorFields)
    type ActorDirector implements Person & ActorInterface { `+/*TODO Exercise 3.1b*/+`
        ${personFields}
        ${actorFields}
        ${directorFields}
    }
    
    # Describe here NonActorDirector type (use the variables personFields and directorFields)
    type NonActorDirector implements Person { `+/*TODO Exercise 3.1c*/+`
        ${personFields}
        ${directorFields}
    }

    # Describe here Director union
    union Director = ActorDirector | NonActorDirector `+/*TODO Exercise 3.2*/+`
    
    type Review {
        review: String!
        when: Datetime!
    }
    
    type Movie {
        title: String!
        cast: [Actor!]!
        year: Int!
        duration: Int
        reviews: [Review!]!
        genres: [Genre!]!`+/*TODO Exercise 1.3*/+`
        directors: [Director!]!`+/*TODO Exercise 3.3*/+`
    }
    
    type Auth {`+/*TODO Mini-assignment 2*/+`
        username: String!
        secretWord: String!
    }
    
    type Query {
        highlightedMovies: [Movie!]!,
        movies(page: Int! = 0): [Movie!]!
        auth: Auth!`+/*TODO Mini-assignment 3*/+`
    }
    
    type Mutation {
        reviewMovie(movieID: Int!, review: String!): Movie!
    }
`
module.exports = schema;