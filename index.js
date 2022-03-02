import { gql, ApolloServer } from "apollo-server"

const persons = [
    {
        name: 'Francisco',
        phone: '999-9999999',
        street: 'The street',
        city: 'Merida',
        id: 'c113a791-3006-4d46-a1af-ff2eeadc57df'
    },
    {
        name: 'Lulu',
        phone: '222-2222222',
        street: 'The street Lu',
        city: 'Puebla',
        id: '9722e765-cfb4-4058-a337-8943e66de9c6'
    },
    {
        name: 'Jasibe',
        street: 'Av. Puebla',
        city: 'Duranfo',
        id: 'f7a7af2e-4492-4bb2-aa93-6c51ecb42b05'
    },
]

const typeDefs = gql`
    type Address {
        street: String!
        city: String!
    }

    type Person {
        name: String!
        phone: String
        address: Address!
        id: ID!
    }

    type Query {
        personCount: Int!
        allPersons: [Person]!
        findPerson(name: String!): Person
    }
`

const resolvers = {
    Query: {
        personCount: () => persons.length,
        allPersons: () => persons,
        findPerson: (root, args) => {
            const {name} = args
            return persons.find(person => person.name === name)
        }
    },
    /* Person: {
        addrees: (root) => `${root.street}, ${root.city}`,
    } */
    Person: {
        address: (root) => {
            return {
                street: root.street,
                city: root.city
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen()
    .then(({url}) => {
        console.log(url)
    })