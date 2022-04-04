var exports = module.exports = {}

exports.adminAuthenticated = function(req,res,next) {
    try {
        if(req.user){
            //user is authenticated
            next();
        }else{
            res.redirect('/admin/auth')
        }
    } catch (error) {
        
        res.redirect('/admin/auth')

    }
}