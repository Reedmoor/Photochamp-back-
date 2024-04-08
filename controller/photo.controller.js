const db = require('../db')

class PhotoController{
    async create(req, res){
        try {
            const { ref, named, description, userid, albumid } = req.body;
            console.log('Received data:', { ref, named, description, userid, albumid });

            const insertParams = { ref, named, description, userid };

            // Добавляем albumid к объекту параметров, если он был передан
            if (albumid !== undefined) {
                insertParams.albumid = albumid;
            }

            const newPhoto = await db.query(
                'INSERT INTO photos (ref, named, description, userid, albumid) VALUES (:ref, :named, :description, :userid, :albumid) RETURNING *',
                {
                    replacements: insertParams,
                    type: db.QueryTypes.INSERT
                }
            );

            console.log('New photo created:', newPhoto);
            res.json(newPhoto);
        } catch (error) {
            console.error('Error creating photo:', error);
            res.status(500).send('Ошибка при создании фото');
        }

    }
    async delete(req, res){
        res.json({message:'albumdelete'})
    }

}
module.exports = new PhotoController()