const LogActivity = require('../database/models/LogActivity');

const LogActivityHandler = async (userId , title , action , information) => {
    await LogActivity.create({
                user_id : userId,
                title : title,
                action : action, 
                information : information
            });
}

module.exports = LogActivityHandler;