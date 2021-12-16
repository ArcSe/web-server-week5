export default (express, bodyParser, createReadStream, crypto, http, user) => {
    const app = express();


    const CORS = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
        'Access-Control-Allow-Headers':'x-test,Content-Type,Accept, Access-Control-Allow-Headers'
        }; 
    

    app
    .use((r, res, next) => { r.res.set(CORS); next(); })
    .use(bodyParser.urlencoded({ extended: true }))
    .get('/sha1/:input/', r => {
        const shasum = crypto.createHash('sha1');
        shasum.update(r.params.input);
    
        r.res.send(shasum.digest('hex'));
    })
    
    .get('/login/', (req, res) => res.send('arcsel'))
    .get('/code/', (req, res) => {
        res.set({'Content-Type': 'text/plain; charset=utf-8'});
        createReadStream(import.meta.url.substring(7)).pipe(res);
    })
    .post('/insert/', async (req, res) => {
        const {login, password, URL} = req.body.addr;
        const newUser = new user({login, password});
        try {
          await mongoose.connect(URL, {useNewUrlPaser: true, useUnifiedTopology: true});
          try {
            await newUser.save();
            r.res.status(201).json({"Добавлено: ": login});
          } catch (error) {
            r.res.status(400).json({"Ошибка: ": "Нет пароля"});
          }
        } catch (error) {
          console.log(error);
        }
    });

    app.all('/req/', (req, res) => {
        const addr = req.method === 'POST' ? req.body.addr : req.query.addr;

        http.get(addr, (r, b = '') => {
            r
            .on('data', d => b += d)
            .on('end', () => res.send(b));
        });
    })
    app.all('*', (req, res) => res.send('arcsel'));
     
    return app;

}
