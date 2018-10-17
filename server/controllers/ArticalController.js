var Resource = require('resourcejs');

module.exports = function(app,route){
    
//setup the controller for REST;
 Resource(app,'',route,app.models.artical).rest();
    
//return middleware.
    return function(req,res,next){
        next();
    };
};