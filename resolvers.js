exports.resolvers = {
    Query: {
        todos: async (root, args, { Todo }) => {
            const todos = await Todo.find()
            return todos
        }
    },
    Mutation: {
        addTodo: async (root, { title }, { Todo }) => {
            const newTodo = await new Todo({title}).save()
            return newTodo
        },
        deleteTodo: async (root, { id }, { Todo }) => {
             const todo = await Todo.findById(id)
             await todo.remove()
             return todo
        },
        completeTodo: async (root, { id }, { Todo }) => {
            const todo = await Todo.findById(id)
            todo.isCompleted = !todo.isCompleted
            await todo.save()
            return todo
       },
        deleteAll: async (root, args, { Todo }) => {
            try {
                await Todo.deleteMany({})
                return true
            } catch (err) {
                return false
            }
       },
       editTodoMutation: async (root, { id, title, isCompleted }, { Todo }) => {
           try {
            const todo = await Todo.findByIdAndUpdate(id, {title, isCompleted}, {new: true})
            return todo
        } catch (err) {
            console.log(err)
        }
       }
    }
}