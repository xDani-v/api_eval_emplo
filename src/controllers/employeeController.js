// employeeController.js
const pool = require('../config/db');

// Get all employees
const getEmployees = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM employees');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get employee by ID
const getEmployeeById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await pool.query('SELECT * FROM employees WHERE employee_id = $1', [id]);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new employee
const createEmployee = async (req, res) => {
    const { first_name, last_name, email, phone_number, hire_date, job_id, salary, commission_pct, manager_id, department_id } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO employees (first_name, last_name, email, phone_number, hire_date, job_id, salary, commission_pct, manager_id, department_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
            [first_name, last_name, email, phone_number, hire_date, job_id, salary, commission_pct, manager_id, department_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update an employee
const updateEmployee = async (req, res) => {
    const id = parseInt(req.params.id);
    const { first_name, last_name, email, phone_number, hire_date, job_id, salary, commission_pct, manager_id, department_id } = req.body;
    try {
        const result = await pool.query(
            'UPDATE employees SET first_name = $1, last_name = $2, email = $3, phone_number = $4, hire_date = $5, job_id = $6, salary = $7, commission_pct = $8, manager_id = $9, department_id = $10 WHERE employee_id = $11 RETURNING *',
            [first_name, last_name, email, phone_number, hire_date, job_id, salary, commission_pct, manager_id, department_id, id]
        );
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete an employee
const deleteEmployee = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await pool.query('DELETE FROM employees WHERE employee_id = $1', [id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
};
