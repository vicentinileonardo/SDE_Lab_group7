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
    
    # TODO Exercise 3.1a - Describe here Actor type (use the variables personFields and actorFields)                                         
    
    # TODO Exercise 3.1b - Describe here ActorDirector type (use the variables personFields, actorFields and directorFields)                 
    
    # TODO Exercise 3.1c - Describe here NonActorDirector type (use the variables personFields and directorFields)                           

    # TODO Exercise 3.2 - Describe here Director union                                                                                      
    
    type Review {
        review: String!
        when: Datetime!
    }
    
    type Movie {
        id: ID!
        title: String!
        #cast: [Actor!]!
        year: Int!
        duration: Int
        reviews: [Review!]!
        # TODO Exercise 1.3
        # TODO Exercise 3.3
    }
    
    # TODO Mini-assignment 2
    #type Auth {                                                                                                         
        #username: String!
        #secretWord: String!
    #}
    
    type Query {
        highlightedMovies: [Movie!]!,
        movies(page: Int! = 0): [Movie!]!
        # Uncomment for Mini-assignment 3
        #auth: Auth!                                                                                                     
    }
    
    type Mutation {
        reviewMovie(movieID: Int!, review: String!): Movie!
    }
`
module.exports = schema;