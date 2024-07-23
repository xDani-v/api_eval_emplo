// departmentController.js
const pool = require('../config/db');

// Get all departments
const getDepartments = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM departments');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get department by ID
const getDepartmentById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await pool.query('SELECT * FROM departments WHERE department_id = $1', [id]);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new department
const createDepartment = async (req, res) => {
    const { department_name, manager_id, location_id } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO departments (department_name, manager_id, location_id) VALUES ($1, $2, $3) RETURNING *',
            [department_name, manager_id, location_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a department
const updateDepartment = async (req, res) => {
    const id = parseInt(req.params.id);
    const { department_name, manager_id, location_id } = req.body;
    try {
        const result = await pool.query(
            'UPDATE departments SET department_name = $1, manager_id = $2, location_id = $3 WHERE department_id = $4 RETURNING *',
            [department_name, manager_id, location_id, id]
        );
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a department
const deleteDepartment = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await pool.query('DELETE FROM departments WHERE department_id = $1', [id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getDepartments,
    getDepartmentById,
    createDepartment,
    updateDepartment,
    deleteDepartment,
};
