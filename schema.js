const { gql } = require('apollo-server-express')

exports.typeDefs = gql`
	type Todo {
        id: ID!
		title: String!
		isCompleted: Boolean!
		createdAt: String!
	}
	type Query {
        todos: [Todo]
	}
	type Mutation {
		addTodo(title: String!): Todo
		deleteTodo(id: ID!): Todo
		completeTodo(id: ID!): Todo
		deleteAll: Boolean
		editTodoMutation(id: ID!, title: String!, isCompleted: Boolean!): Todo
	}
`