import { Request, Response } from "express";

const todos = [
    {id: 1, text: 'buy milk', createdAt: new Date()},
    {id: 2, text: 'biy bread', createdAt: null},
    {id: 3, text: 'buy butter', createdAt: new Date()},
    {id: 4, text: 'buy coffe', createdAt: new Date()}
]


export class TodosController {

    contructor() {}

    public getTodos = (req: Request, res: Response) => {

        return res.json( todos )
    }

    public getTodoById = (req: Request, res: Response) => {

        const id = +req.params.id;

        if ( isNaN(id) ) return res.status(400).json({error: `ID argument is not number`});

        const todo = todos.find( element => element.id === id );

        ( todo )
            ? res.status(200).json( todo )
            : res.status(404).json({ error: `TODO with ${id} not found` })
    }

    public createTodo = (req: Request, res: Response) => {
        const { text } = req.body;
        if( !text ) return res.status(400).json({ error: 'text is required' });

        const newTodo = {
            id: todos.length +1,
            text: text,
            createdAt: null
        }

        todos.push( newTodo );

        res.json( newTodo );
    }

    public updateTodo = (req: Request, res: Response) => {

        const id = +req.params.id
        if ( isNaN(id) ) return res.status(400).json({ error: `ID argument is not a number`});

        const todo = todos.find( todo => todo.id === id );
        if ( !todo ) return res.status(404).json({ error: `TODO with id ${id} not found`});

        const { text, createdAt } = req.body;

        todo.text = text || todo.text;
        ( createdAt === 'null' )
            ? todo.createdAt = createdAt
            : todo.createdAt = new Date( createdAt || todo.createdAt );

        res.json( todo )
    }

    public deleteTodo = (req: Request, res: Response) => {

        const id = +req.params.id
        if ( isNaN(id) ) return res.status(400).json({ error: `ID argument is not a number`});

        const todo = todos.find( todo => todo.id === id );
        if ( !todo ) return res.status(404).json({ error: `TODO with id ${id} not found`});

        todos.splice( todos.indexOf( todo ), 1 )

        res.json( todo )
    }
}