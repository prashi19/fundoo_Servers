const redis = require('redis');
const client = redis.createClient();
const query = 'notes-'

client.on('error', (err) => {
    console.error(err);
});


module.exports = {
    userNotes(data, callback) {
        console.log("data in redis server--->", data);
        client.get(query + data, (err, result) => {
            if (result) {
                callback(null, result);
            } else {
                console.error("REDIS ERROR: ", err);
                callback(err);
            }
        })
    },
    onUpdateUserNotes(result, key) {
        try {
            // Save the notesRedis API response in Redis store
            client.set(query + key, JSON.stringify(result));
        } catch (err) {
            throw new Error("Redis SET error", err);
        }

    },

    onDelete(userId){
        console.log("userId----->",userId);
        client.del(query +userId, function(err, response) {
            if (response == 1) {
               console.log("Deleted Successfully!")
            } else{
             console.log("Cannot delete")
            }
         })
        
    }
    
}