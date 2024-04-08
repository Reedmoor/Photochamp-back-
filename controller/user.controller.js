const db = require('../db')

class UserController {
    async registration(req, res) {
        try {
            const { named, description, login, password } = req.body;
            console.log('Received data:', { named, description, login, password });

            const newUser = await db.query(
                'INSERT INTO Users (named, description, login, password) VALUES (:named, :description, :login, :password) RETURNING *',
                {
                    replacements: { named, description, login, password },
                    type: db.QueryTypes.INSERT
                }
            );

            console.log('New user created:', newUser);
            res.json(newUser);
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).send('Ошибка при создании пользователя');
        }
    }

    async login(req, res) {
        try {
            const { login, password } = req.body;
            console.log('Received data:', { login, password });

            const user = await db.query(
                'SELECT * FROM users WHERE login = :login AND password = :password',
                {
                    replacements: { login, password },
                    type: db.QueryTypes.SELECT
                }
            );

            if (user.length === 0) {
                console.log('User not found or invalid credentials');
                res.status(401).send('Неверный логин или пароль');
            } else {
                console.log('User logged in:', user[0]);
                res.json(user[0]);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            res.status(500).send('Ошибка при входе');
        }
    }

    async check(req, res) {
        res.json({ message: 'online' });
    }
}

module.exports = new UserController();