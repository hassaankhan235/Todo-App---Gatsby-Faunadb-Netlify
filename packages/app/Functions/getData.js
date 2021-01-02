const {ApolloServer, gql} = require('apollo-server-lambda')
const faunda = require('faunadb'),
q = faunda.query;

const typeDefs = gql`
type data {
    title: String
}

type posts {
    ref: String!
    ts: String
    data: data
}

type Query {
    Upost : String   
    Aposts : [posts]
}
`
const resolvers = {
    Query : {
        Upost : async() => {
            try{
                console.log('CONNECTING NOW')
                var client = new faunda.Client({secret: 'fnAD8k-3RiACB8K1iVEw5OgNm-JRLgWZHOuYAd7v'}) 
                let res = await client.query(
                    q.Get(q.Ref(q.Collection('posts'), '284561364268090887')))
                console.log('RESP', res.data.title)
                return res.data.title
            }
            catch(err){
                console.log("ERROR", err)
            }
        },
        Aposts : async() => {
            try{
                var client = new faunda.Client({secret: 'fnAD8k-3RiACB8K1iVEw5OgNm-JRLgWZHOuYAd7v'})
                var res = await client.query(
                    q.Map(
                            q.Paginate(q.Match(q.Index("PostTitle"))),
                            q.Lambda(["title", "ref"], q.Get(q.Var("ref")))
                      )
                )
                return res.data
            }
            catch(err){
                console.log("ERROR", err)
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    introspection: true
})

exports.handler = server.createHandler()