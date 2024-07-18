import express from 'express';
import path from 'path';

interface Options {
    port: number,
    public_path?: string
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly public_path: string;

    constructor(options: Options){
        const { port, public_path = 'public' } = options;
        this.port = port;
        this.public_path = public_path;
    }

        
    
    async start() {
        
        //* Middleewares

        //* Public Folder
        this.app.use( express.static( this.public_path) )

        this.app.use( '*', (req, res) => {
            const idexPath = path.join(__dirname + `../../../${ this.public_path }/index.html`);
            res.sendFile(idexPath);
        })

        this.app.listen( this.port, () => {
            console.log(`Server corriendo en puerto ${ this.port }`)
        })
        
    }

}