import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();

// Middleware CORS dan batas ukuran upload 50MB untuk file Base64
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Konfigurasi Koneksi MySQL (FreeDB)
// Gunakan Environment Variables saat deploy di Render, atau isi langsung di bagian fallback ('...')
const db = mysql.createPool({
    host: process.env.DB_HOST || 'sql.freedb.tech',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'u_8lAMhb',
    password: process.env.DB_PASSWORD || 'lqrgahbokaDI',
    database: process.env.DB_NAME || 'freedb_pHUguz7K',
    waitForConnections: true,
    connectionLimit: 3, // Wajib maksimal 3 agar tidak terkena limit "Too many connections" di FreeDB
    queueLimit: 0
});

// Cek koneksi awal saat server menyala
db.getConnection((err, connection) => {
    if (err) {
        console.error('Gagal terhubung ke FreeDB MySQL:', err.message);
    } else {
        console.log('Berhasil terhubung ke FreeDB MySQL!');
        connection.release();
    }
});

// Route utama untuk mengecek apakah server backend aktif
app.get('/', (req, res) => {
    res.send('API Backend Task Workspace aktif dan terhubung ke FreeDB!');
});

// 1. GET: Ambil semua data tugas
app.get('/api/tasks', (req, res) => {
    db.query('SELECT * FROM tasks ORDER BY id DESC', (err, results) => {
        if (err) {
            console.error('Error GET:', err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// 2. POST: Tambah tugas baru
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
                console.error('Error POST:', err.message);
                return res.status(500).json({ error: err.message });
            }
            res.json({ id: result.insertId, ...req.body });
        }
    );
});

// 3. PUT: Ubah seluruh data tugas berdasarkan ID
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

// 4. PATCH: Khusus ubah status Selesai / Belum Selesai
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

// 5. DELETE: Hapus tugas berdasarkan ID
app.delete('/api/tasks/:id', (req, res) => {
    db.query('DELETE FROM tasks WHERE id = ?', [req.params.id], (err, result) => {
        if (err) {
            console.error(`Error DELETE ID ${req.params.id}:`, err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Tugas berhasil dihapus' });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
