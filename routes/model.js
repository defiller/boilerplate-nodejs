import ModelController from '../controllers/model';
import AuthController from '../controllers/auth';

//app = express
module.exports = app => {
    app.route('/').all((req, res) => res.send("teste"))
    //middleware instancia class ModelController e atribui o objeto instanciado na requisição
    app.route('/v1/a/:collection/:id').all(async (req, res, next) => {

        const authController = new AuthController(req)

        const auth = await authController.verifyAuth()

        if (!auth.error) {

            req.modelController = new ModelController(req)

            next()

        } 
        else res.json(auth)
    })
    
    .get( async (req,res) => res.json( await req.modelController.selectAny() ) )

    .put( async (req,res) => res.json( await req.modelController.update() ) )

    .delete( async (req,res) => res.json( await req.modelController.delete() ) )

    app.route('/v1/a/:collection').all(async (req, res, next) => {

        const authController = new AuthController(req)

        const auth = await authController.verifyAuth()

        if (!auth.error) {

            req.modelController = new ModelController(req)

            next()

        }

        else res.json(auth)

    })
    
    .get( async (req,res) => res.json( await req.modelController.selectAll() ) )

    .post( async (req,res) => res.json( await req.modelController.store() ) )

}
