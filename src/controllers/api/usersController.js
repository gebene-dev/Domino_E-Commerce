const db = require('../../database/models')

module.exports = {
    getEmails : (req,res) => {
        db.Usuario.findAll()
            .then(users =>{
                const emails = users.map(user => user.email)
                res.json(emails)
            }).catch(err =>{
                console.log(err);
            })
    }
}