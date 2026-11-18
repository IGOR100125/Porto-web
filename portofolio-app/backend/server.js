import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_tugas',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// GET: Ambil semua tugas
app.get('/api/tasks', (req, res) => {
    db.query('SELECT * FROM tasks ORDER BY id DESC', (err, results) => {
        if (err) {
            console.error('Error GET:', err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// POST: Tambah tugas baru
app.post('/api/tasks', (req, res) => {
    const { title, description, task_date, due_date, status, file_name, file_data } = req.body;
    
    const cleanTaskDate = task_date ? String(task_date).split('T')[0] : null;
    const cleanDueDate = due_date ? String(due_date).split('T')[0] : null;

    const query = `INSERT INTO tasks (title, description, task_date, due_date, status, file_name, file_data) 
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;
    
    db.query(
        query, 
        [title, description || '', cleanTaskDate, cleanDueDate, status || 'Belum Selesai', file_name || null, file_data || null], 
        (err, result) => {
            if (err) {
                console.error("Error POST:", err.message);
                return res.status(500).json({ error: err.message });
            }
            res.json({ id: result.insertId, ...req.body });
        }
    );
});

// PUT: Edit seluruh data tugas berdasarkan ID
app.put('/api/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const { title, description, task_date, due_date, status, file_name, file_data } = req.body;

    const cleanTaskDate = task_date ? String(task_date).split('T')[0] : null;
    const cleanDueDate = due_date ? String(due_date).split('T')[0] : null;

    const query = `UPDATE tasks SET title=?, description=?, task_date=?, due_date=?, status=?, file_name=?, file_data=? WHERE id=?`;
    
    db.query(
        query, 
        [title, description || '', cleanTaskDate, cleanDueDate, status || 'Belum Selesai', file_name || null, file_data || null, taskId], 
        (err, result) => {
            if (err) {
                console.error(`Error PUT ID ${taskId}:`, err.message);
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Tugas berhasil diperbarui' });
        }
    );
});

// PATCH: Khusus ubah status Selesai / Belum Selesai
app.patch('/api/tasks/:id/status', (req, res) => {
    const taskId = req.params.id;
    const { status } = req.body;

    db.query('UPDATE tasks SET status = ? WHERE id = ?', [status, taskId], (err, result) => {
        if (err) {
            console.error(`Error PATCH status ID ${taskId}:`, err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Status berhasil diperbarui' });
    });
});

// DELETE: Hapus tugas
app.delete('/api/tasks/:id', (req, res) => {
    db.query('DELETE FROM tasks WHERE id = ?', [req.params.id], (err, result) => {
        if (err) {
            console.error(`Error DELETE ID ${req.params.id}:`, err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Tugas berhasil dihapus' });
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server db_tugas aktif di http://localhost:${PORT}`));