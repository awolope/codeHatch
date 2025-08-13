'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TutorAddLesson({ courseId }) {
  const router = useRouter();
  const [lesson, setLesson] = useState({ title: '', type: 'video', resourceUrl: '', description: '', durationMinutes: 0 });
  const [loading, setLoading] = useState(false);

  const uploadFile = async (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const fd = new FormData(); fd.append('file', f);
    setLoading(true);
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const data = await res.json();
    setLoading(false);
    if (data.url) setLesson({ ...lesson, resourceUrl: data.url, resourcePublicId: data.public_id });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`/api/courses/${courseId}/lessons`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lesson)
    });
    const json = await res.json();
    setLoading(false);
    if (res.ok) {
      alert('Lesson added');
      router.refresh();
    } else {
      alert(json.error || 'Error');
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3 bg-white p-4 rounded shadow">
      <input value={lesson.title} onChange={e=>setLesson({...lesson, title:e.target.value})} required placeholder="Lesson title" className="w-full p-2 border rounded" />
      <select value={lesson.type} onChange={e=>setLesson({...lesson, type:e.target.value})} className="w-full p-2 border rounded">
        <option value="video">Video</option>
        <option value="article">Article</option>
        <option value="pdf">PDF</option>
        <option value="external">External link</option>
      </select>
      <input placeholder="Resource URL (or upload below)" value={lesson.resourceUrl} onChange={e=>setLesson({...lesson, resourceUrl:e.target.value})} className="w-full p-2 border rounded" />
      <div>
        <label className="text-sm">Upload</label>
        <input type="file" onChange={uploadFile} />
        {lesson.resourceUrl && <div className="mt-2 text-xs text-green-600">Uploaded: {lesson.resourceUrl}</div>}
      </div>
      <textarea placeholder="Short description" value={lesson.description} onChange={e=>setLesson({...lesson, description:e.target.value})} className="w-full p-2 border rounded" />
      <input value={lesson.durationMinutes} type="number" onChange={e=>setLesson({...lesson, durationMinutes: Number(e.target.value)})} placeholder="Duration minutes" className="w-full p-2 border rounded" />
      <button disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">{loading ? 'Adding...' : 'Add Lesson'}</button>
    </form>
  );
}
