import { pool } from '../db.js';

export const getEmployees = async (req, res) => {

    try {

        const [rows] = await pool.query('SELECT * FROM employee');
        res.json(rows);

    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });

    }
};

export const getEmployee = async (req, res) => {

    try {

        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [req.params.id])
        if (rows.length <= 0) return res.status(404).json({ message: 'employee not found' });
        res.json(rows[0]);

    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};

export const createEmployees = async (req, res) => {

    try {
        const { name, lastname, salary } = req.body;
        if (typeof name == 'string' && typeof lastname == 'string' && typeof salary == 'number') {

            const [rows] = await pool.query('INSERT INTO employee (name, lastname, salary) VALUES (?,?,?)', [name, lastname, salary]);

            res.send({
                id: rows.insertId,
                name,
                lastname,
                salary
            });

        } else {
            res.json({ "error": "Ingrese datos válidos!" });
        }

    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};

export const updateEmployees = async (req, res) => {

    try {

        const { id } = req.params;
        const { name, lastname, salary } = req.body;

        const [result] = await pool.query('UPDATE employee SET name = ?, lastname = ?, salary = ? WHERE id = ?', [name, lastname, salary, id]);

        if (result.affectedRows === 0) return res.status(404).json({ message: 'Employee not found' });
        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [id]);
        res.json(rows[0]);

    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};

export const updatePatchEmployees = async (req, res) => {

    try {

        const { id } = req.params;
        const { name, lastname, salary } = req.body;

        const [result] = await pool.query('UPDATE employee SET name = IFNULL(?,name), lastname = IFNULL(?,lastname), salary = IFNULL(?,salary) WHERE id = ?', [name, lastname, salary, id]);

        if (result.affectedRows === 0) return res.status(404).json({ message: 'Employee not found' });
        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [id]);
        res.json(rows[0]);

    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};

export const deleteEmployees = async (req, res) => {

    try {

        const [result] = await pool.query('DELETE FROM employee WHERE id = ?', [req.params.id]);
        if (result.affectedRows <= 0) {
            return res.status(404).json({ message: 'Employee not found' })
        } else {
            res.sendStatus(204);
        }

    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};
