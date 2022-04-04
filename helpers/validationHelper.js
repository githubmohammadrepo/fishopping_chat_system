var exports = module.exports = {}

exports.createErrorMessage = function(error,message) {
    try {
       if(typeof error =='string'){
            if(error.length){
                return error;
            }else{
                if(message.length){
                    return message;
                }else{
                    return 'some error accured on the server';
                }
            }
       }else{
           
           if(error.details && error.details.length && error.details[0].message){
               
               return error.details[0].message;
           }else{
            if(message.length){
                return message;
            }else{
                return 'some error accured on the server';
            }
           }
       }
    } catch (error) {
        
        return error.message;
    }
}