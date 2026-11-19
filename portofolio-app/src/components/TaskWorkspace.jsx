import React, { useState, useEffect, useRef } from 'react';

const TaskWorkspace = ({ handleNavigation }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form States
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [fileData, setFileData] = useState(null);
  const [fileName, setFileName] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Reference untuk input file HTML
  const fileInputRef = useRef(null);

  // Mengarah langsung ke api.php di folder htdocs InfinityFree
  const API_URL = '/api.php';

  const loadTasksFromDB = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (Array.isArray(data)) {
        setTasks(data);
      }
    } catch (err) {
      console.error('Gagal memuat dari MySQL:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasksFromDB();
  }, []);

  // Upload File
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileData(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit Form (Tambah Baru / Edit Data)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const isEditing = editingId !== null && editingId !== undefined;
    const currentTask = tasks.find(t => String(t.id) === String(editingId));
    const currentStatus = isEditing ? (currentTask?.status || 'Belum Selesai') : 'Belum Selesai';

    const payload = {
      title,
      description: description || '',
      task_date: taskDate || null,
      due_date: dueDate || null,
      status: currentStatus,
      file_name: fileName || null,
      file_data: fileData || null,
    };

    const url = isEditing ? `${API_URL}?action=update&id=${editingId}` : API_URL;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal menyimpan ke database');

      alert(isEditing ? 'Data tugas berhasil diperbarui!' : 'Tugas baru berhasil ditambahkan!');
      loadTasksFromDB();
      resetForm();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  // Reset Form sekaligus mengosongkan elemen <input type="file" />
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setTaskDate('');
    setDueDate('');
    setFileData(null);
    setFileName('');
    setEditingId(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Edit Tugas
  const handleEdit = (e, task) => {
    e.preventDefault();
    setEditingId(task.id);
    setTitle(task.title || '');
    setDescription(task.description || '');
    setTaskDate(task.task_date ? String(task.task_date).split('T')[0] : '');
    setDueDate(task.due_date ? String(task.due_date).split('T')[0] : '');
    setFileName(task.file_name || '');
    setFileData(task.file_data || null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    const formElement = document.getElementById('task-form-section');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Toggle Status Selesai / Belum Selesai
  const handleToggleStatus = async (e, task) => {
    e.preventDefault();
    const newStatus = task.status === 'Selesai' ? 'Belum Selesai' : 'Selesai';

    try {
      const res = await fetch(`${API_URL}?action=status&id=${task.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal mengubah status');

      loadTasksFromDB();
    } catch (err) {
      alert(`Gagal ubah status: ${err.message}`);
    }
  };

  // Hapus Tugas
  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm('Hapus tugas ini dari database?')) return;
    try {
      const res = await fetch(`${API_URL}?action=delete&id=${id}`, {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal menghapus');

      loadTasksFromDB();
    } catch (err) {
      alert(`Gagal hapus: ${err.message}`);
    }
  };

  return (
    <section className="section-padding" style={{ paddingTop: '10rem', minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
      
      {/* Header */}
      <div className="animate-on-scroll fade-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '2rem' }}>
        <div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1.1' }}>
            Task <br /> Workspace.
          </h2>
          <p style={{ color: 'var(--text-gray)', marginTop: '1rem', fontSize: '1rem' }}>
            Sistem Pengumpulan Tugas Semester 5
          </p>
        </div>

        {handleNavigation && (
          <div className="animate-on-scroll fade-up">
            <button 
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('all-projects', 'page');
              }}
              className="premium-btn"
            >
              Eksplorasi Proyek
            </button>
          </div>
        )}
      </div>

      {/* Form Input / Edit */}
      <div 
        id="task-form-section"
        className="animate-on-scroll fade-up" 
        style={{ backgroundColor: '#fff', padding: '3rem', border: '1px solid var(--border-light)', marginBottom: '5rem' }}
      >
        <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
          {editingId !== null ? `✎ Ubah Data Tugas (ID: ${editingId})` : '+ Input Tugas Baru'}
        </h3>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', color: 'var(--text-gray)' }}>
              Judul Tugas *
            </label>
            <input 
              type="text" 
              placeholder="Contoh: Modul 4 Lab IMK"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--border-light)', background: 'var(--bg-color)', fontSize: '1rem' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', color: 'var(--text-gray)' }}>
                Tanggal Tugas
              </label>
              <input 
                type="date"
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--border-light)', background: 'var(--bg-color)', fontSize: '1rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', color: 'var(--text-gray)' }}>
                Deadline Tugas
              </label>
              <input 
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--border-light)', background: 'var(--bg-color)', fontSize: '1rem' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', color: 'var(--text-gray)' }}>
              Deskripsi Tugas
            </label>
            <textarea 
              rows="3"
              placeholder="Detail pengerjaan..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--border-light)', background: 'var(--bg-color)', fontSize: '1rem', resize: 'vertical' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', color: 'var(--text-gray)' }}>
              Upload Berkas / File
            </label>
            <input 
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              style={{ width: '100%', padding: '10px', border: '1px solid var(--border-light)', background: 'var(--bg-color)' }}
            />
          </div>

          {/* Live Preview File */}
          {fileData && (
            <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--accent-gold)' }}>
                  Preview File: {fileName}
                </p>
                <button 
                  type="button" 
                  onClick={() => {
                    setFileData(null);
                    setFileName('');
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  style={{ background: 'none', border: 'none', color: '#D32F2F', cursor: 'pointer', fontSize: '0.8rem', textDecoration: 'underline' }}
                >
                  Hapus File Ini
                </button>
              </div>
              {fileData.startsWith('data:image/') ? (
                <img src={fileData} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }} />
              ) : (
                <a href={fileData} download={fileName} style={{ color: 'var(--text-dark)', textDecoration: 'underline' }}>
                  📄 Preview / Download File ({fileName})
                </a>
              )}
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="submit" className="premium-btn" style={{ backgroundColor: 'var(--text-dark)', color: 'var(--bg-color)' }}>
              {editingId !== null ? 'Simpan Perubahan' : 'Submit'}
            </button>

            {editingId !== null && (
              <button 
                type="button" 
                onClick={resetForm}
                className="premium-btn"
                style={{ borderColor: 'var(--text-gray)', color: 'var(--text-gray)' }}
              >
                Batal Edit
              </button>
            )}
          </div>

        </form>
      </div>

      {/* Histori Tugas */}
      <div>
        <h3 style={{ fontSize: '2rem', marginBottom: '2.5rem' }}>
          Histori Tugas ({tasks.length})
        </h3>

        {loading ? (
          <p style={{ color: 'var(--text-gray)' }}>Memuat dari database MySQL...</p>
        ) : tasks.length === 0 ? (
          <p style={{ color: 'var(--text-gray)' }}>Belum ada tugas di database.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '2rem' }}>
            {tasks.map((task) => {
              const isDone = task.status === 'Selesai';

              return (
                <div 
                  key={task.id} 
                  style={{ 
                    padding: '2.5rem', 
                    backgroundColor: isDone ? '#f2f2ef' : '#fff', 
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    opacity: isDone ? 0.75 : 1
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <span style={{ 
                        fontSize: '0.7rem', 
                        letterSpacing: '1px', 
                        textTransform: 'uppercase', 
                        padding: '4px 10px', 
                        backgroundColor: isDone ? '#388E3C' : 'var(--accent-gold)', 
                        color: '#fff' 
                      }}>
                        {task.status}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-gray)' }}>
                        Deadline: {task.due_date ? String(task.due_date).split('T')[0] : '-'}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '1.5rem', marginBottom: '0.8rem', textDecoration: isDone ? 'line-through' : 'none' }}>
                      {task.title}
                    </h4>

                    {task.task_date && (
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-gray)', marginBottom: '0.5rem' }}>
                        Tanggal Tugas: {String(task.task_date).split('T')[0]}
                      </p>
                    )}

                    <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                      {task.description || 'Tidak ada deskripsi.'}
                    </p>

                    {task.file_data && (
                      <div style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px dashed var(--border-light)', backgroundColor: 'var(--bg-color)' }}>
                        {task.file_data.startsWith('data:image/') ? (
                          <img src={task.file_data} alt={task.file_name} style={{ width: '100%', maxHeight: '150px', objectFit: 'cover' }} />
                        ) : (
                          <a href={task.file_data} download={task.file_name} style={{ fontSize: '0.85rem', color: 'var(--text-dark)', textDecoration: 'underline' }}>
                            📁 Download {task.file_name}
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
                    <button 
                      type="button"
                      onClick={(e) => handleToggleStatus(e, task)}
                      style={{ flex: 1, padding: '8px', border: '1px solid var(--text-dark)', background: 'transparent', cursor: 'pointer', fontSize: '0.7rem', textTransform: 'uppercase' }}
                    >
                      {isDone ? 'Batalkan Selesai' : 'Tandai Selesai'}
                    </button>
                    <button 
                      type="button"
                      onClick={(e) => handleEdit(e, task)}
                      style={{ padding: '8px 12px', border: '1px solid var(--accent-gold)', color: 'var(--accent-gold)', background: 'transparent', cursor: 'pointer', fontSize: '0.7rem', textTransform: 'uppercase' }}
                    >
                      Ubah
                    </button>
                    <button 
                      type="button"
                      onClick={(e) => handleDelete(e, task.id)}
                      style={{ padding: '8px 12px', border: 'none', background: '#D32F2F', color: '#fff', cursor: 'pointer', fontSize: '0.7rem', textTransform: 'uppercase' }}
                    >
                      Hapus
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

    </section>
  );
};

export default TaskWorkspace;
