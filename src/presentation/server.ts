import express, { Router } from 'express';
import path from 'path';

interface Options {
    port: number,
    public_path?: string,
    routes: Router
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly public_path: string;
    private readonly routes: Router;

    constructor(options: Options){
        const { port, routes, public_path = 'public' } = options;
        this.port = port;
        this.public_path = public_path;
        this.routes = routes
    }

        
    
    async start() {
        
        //* Middleewares
        this.app.use( express.json() ); // permite el raw
        this.app.use( express.urlencoded({ extended: true }) ); // permite el x-www-form-urlencoded

        //* Public Folder
        this.app.use( express.static( this.public_path) )

        //* Routes
        this.app.use( this.routes )


        //* SPA
        this.app.use( '*', (req, res) => {
            const idexPath = path.join(__dirname + `../../../${ this.public_path }/index.html`);
            res.sendFile(idexPath);
        })


        this.app.listen( this.port, () => {
            console.log(`Server corriendo en puerto ${ this.port }`)
        })
        
    }

}