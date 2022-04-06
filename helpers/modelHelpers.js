var exports = module.exports = {}

exports.makeModelName = function(table_name) {
    try {
        if (!table_name || table_name.length == 0) {
            throw new Error('some was wrong')
        }

        table_name = table_name.split('')
        table_name[0] = table_name[0].toUpperCase();
        let lastChat = table_name[table_name.length - 1];
        table_name[table_name.length - 1] = lastChat == 's' ? '' : lastChat;
        table_name = table_name.join('');
        return table_name;
    } catch (error) {
        
        return null;
    }
}