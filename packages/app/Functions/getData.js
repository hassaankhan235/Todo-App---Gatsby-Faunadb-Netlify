
const {ApolloServer, gql} = require('apollo-server-lambda');
const faunda = require('faunadb'),

q = faunda.query;


const typeDefs = gql`
type data {
    title: String
}

type List {
    col: String
    id: String    
}

type posts {
    ref: List
    ts: String
    data: data
}

type Query {
    Upost : String   
    Aposts(Uname: String!) : [posts]
}

type Mutation {
    del(ts: String) : posts
    New_task(title: String, user: String): String  
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
        Aposts : async(_,Uname) => {
            try{
                console.log("UNAME IS", Uname)
                var client = new faunda.Client({secret: 'fnAD8k-3RiACB8K1iVEw5OgNm-JRLgWZHOuYAd7v'})
                var res = await client.query(
                    q.Map(
                            q.Paginate(q.Match(q.Index("PostByUser"), Uname.Uname)),
                            q.Lambda(["ref"], q.Get(q.Var("ref")))
                      )
                )
                console.log('DATA',res.data)
                return (res.data)
            }
            catch(err){
                console.log("ERROR", err)
            }
        }
    },
    Mutation: {
        del: async(_, ts) => {
            console.log('CONNECTING TO SERVER', ts)
            try{
                var client = new faunda.Client({secret: 'fnAD8k-3RiACB8K1iVEw5OgNm-JRLgWZHOuYAd7v'})
                var res = await client.query(
                    q.Delete(q.Ref(q.Collection('posts'), ts.ts))
                )
                console.log('RESP', res)  
                return (res) 
            }
            catch(err){
                console.log("ERROR", err)
            }
        },
        New_task : async(_,taskDetails) => {
            console.log('RECEIVED TASK', taskDetails)
            try{
                var client = new faunda.Client({secret: 'fnAD8k-3RiACB8K1iVEw5OgNm-JRLgWZHOuYAd7v'})
                var res = await client.query(
                    q.Create(
                        q.Collection('posts'),{data: 
                            {
                                user: taskDetails.user,
                                title : taskDetails.title 
                            }}
                    )
                )
            }catch(err){
                console.log(err)
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