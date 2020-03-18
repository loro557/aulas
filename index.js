const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const connection = require('./database/database');
const articlesController = require('./articles/articlesController');
const categoriesController = require('./categories/categoriesController');
const UsersController = require('./user/UsersController');

const Article = require('./articles/Article');
const Category = require('./categories/Category');
const User = require('./user/User');

// view engine
app.set('view engine', 'ejs');

// seçoes
app.use(session({
   secret: "loromp124241marcosribeiro", cookie: { maxAge: 10800000} 
}));

// arquivos estaticos
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Database

connection
    .authenticate()
    .then(()=>{
    	console.log("Conexao criada com sucesso");
    }).catch((error)=>{
    	console.log(error);
    });

app.use('/', categoriesController);
app.use('/', articlesController);
app.use('/', UsersController);


app.get('/', (req, res)=>{ // Home page
	Article.findAll({
       order:[
          ['id','DESC']
       ], 
       limit: 4
  }).then(articles =>{

       Category.findAll().then(categories =>{
            res.render('index', {articles: articles, categories: categories});
       });
      
	});
	
});

app.get('/:slug', (req, res)=>{
	var slug = req.params.slug;
	Article.findOne({
       where: {
       	 slug: slug
       }
	}).then(article =>{
         if(article != undefined){
           Category.findAll().then(categories =>{
            res.render('article', {article: article, categories: categories});
       });
         }else{
            res.redirect('/');
         }
	}).catch(err =>{
        res.redirect('/');
	});
	
});

app.get('/category/:slug', (req, res)=>{
     var slug = req.params.slug;
     Category.findOne({
         where: {
            slug: slug
         },
         include: [{model: Article}]
     }).then(category =>{
         if(category != undefined){

          Category.findAll().then(categories =>{
             res.render('index', {articles: category.articles, categories: categories})
          });
             
         }else{
           res.redirect('/');
         }
     }).catch( err =>{
         res.redirect('/');
     })
});


var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Umbler listening on port %s', port);
});