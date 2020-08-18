let bodyParser=require('body-parser');
module.exports=function(app) {
    var pillList=require('./pilldata');
    app.use(bodyParser.urlencoded({extended: true}));
    console.log(app.use(bodyParser.json()));


    app.route('/pills')
        .get(pillList.list_all_pills)
    app.route('/pills/:id')
        .get(pillList.find_pill)
    app.route('/pills/:id')
        .put(pillList.update_pill)
    app.route('/pills/')
        .post(pillList.add_pill)
    app.route('/pills/:id')
        .delete(pillList.delete_pill)




};