import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Plus, Trash, Save, Calendar, X } from "lucide-react";
import type { Blog } from "../../root/Blogs";
import { InputGroup, TextAreaGroup, Button } from "./AdminUI";
import { API_URL } from "./constants";
import { toast } from "sonner";


export function BlogsEditor() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [currentBlog, setCurrentBlog] = useState<Partial<Blog>>({});

    useEffect(() => { fetchBlogs() }, []);

    const fetchBlogs = () => fetch(`${API_URL}/blogs`).then(r => r.json()).then(setBlogs);

    const handleSave = async () => {
        const method = currentBlog.id ? 'PUT' : 'POST';
        const url = currentBlog.id ? `${API_URL}/blogs/${currentBlog.id}` : `${API_URL}/blogs`;
        // Auto slug
        if (!currentBlog.slug && currentBlog.title) {
            currentBlog.slug = currentBlog.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        }
        if (!currentBlog.date) currentBlog.date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

        try {
            await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(currentBlog) });
            toast.success(currentBlog.id ? "Blog updated" : "Blog created");
            setIsOpen(false);
            fetchBlogs();
        } catch (e) {
            toast.error("Failed to save blog");
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this blog?")) return;
        try {
            await fetch(`${API_URL}/blogs/${id}`, { method: 'DELETE' });
            toast.success("Blog deleted");
            fetchBlogs();
        } catch (e) {
            toast.error("Failed to delete blog");
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="text-sm text-gray-400">Manage your long-form content.</div>
                <Button onClick={() => { setCurrentBlog({}); setIsOpen(true); }} icon={Plus}>New Blog Post</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map(blog => (
                    <div key={blog.id} className="bg-dark-card border border-dark-border rounded-2xl overflow-hidden group hover:border-primary transition-all flex flex-col h-full">
                        <div className="relative h-40 overflow-hidden">
                            <img src={blog.image} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
                            <div className="absolute top-2 right-2 flex gap-1">
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium backdrop-blur-md ${blog.published ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'}`}>
                                    {blog.published ? 'Published' : 'Draft'}
                                </span>
                            </div>
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                            <h4 className="font-bold text-lg text-white mb-2 line-clamp-2">{blog.title}</h4>
                            <p className="text-gray-500 text-xs mb-4 flex items-center gap-2"><Calendar className="w-3 h-3" /> {blog.date}</p>
                            <div className="mt-auto flex gap-2 pt-4 border-t border-dark-border">
                                <Button variant="secondary" className="flex-1 h-8 text-xs" onClick={() => { setCurrentBlog(blog); setIsOpen(true); }}>Edit</Button>
                                <Button variant="danger" className="h-8 w-8 px-0" onClick={() => handleDelete(blog.id)} icon={Trash}></Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm data-[state=open]:animate-fade-in z-50" />
                    <Dialog.Content aria-describedby="dialog-desc" className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-2xl translate-x-[-50%] translate-y-[-50%] rounded-[24px] bg-dark-card p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-dark-border focus:outline-none z-50 overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <Dialog.Title className="text-2xl font-bold text-white">{currentBlog.id ? 'Edit Blog' : 'Create Blog'}</Dialog.Title>
                                <Dialog.Description id="dialog-desc" className="text-gray-400 text-sm mt-1">
                                    {currentBlog.id ? 'Make changes to your blog post here.' : 'Fill in the details for your new blog post.'}
                                </Dialog.Description>
                            </div>
                            <Dialog.Close asChild><button className="text-gray-500 hover:text-white"><X className="w-6 h-6" /></button></Dialog.Close>
                        </div>

                        <div className="space-y-6">
                            <InputGroup label="Title" value={currentBlog.title} onChange={(v) => setCurrentBlog({ ...currentBlog, title: v })} placeholder="Enter blog title..." />
                            <div className="grid grid-cols-2 gap-4">
                                <InputGroup label="Slug (Auto-generated if empty)" value={currentBlog.slug} onChange={(v) => setCurrentBlog({ ...currentBlog, slug: v })} placeholder="my-blog-post" />
                                <InputGroup label="Date" value={currentBlog.date} onChange={(v) => setCurrentBlog({ ...currentBlog, date: v })} placeholder="YYYY-MM-DD" type="text" />
                            </div>
                            <InputGroup label="Cover Image URL" value={currentBlog.image} onChange={(v) => setCurrentBlog({ ...currentBlog, image: v })} placeholder="https://..." />
                            <TextAreaGroup label="Content (Markdown)" value={currentBlog.content} onChange={(v) => setCurrentBlog({ ...currentBlog, content: v })} rows={12} placeholder="# Hello World..." />

                            <div className="flex items-center gap-2">
                                <input type="checkbox" checked={currentBlog.published || false} onChange={e => setCurrentBlog({ ...currentBlog, published: e.target.checked })} id="published" className="w-5 h-5 rounded border-gray-600 bg-dark-accent text-primary focus:ring-primary" />
                                <label htmlFor="published" className="text-white font-medium">Publish this post</label>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <Dialog.Close asChild><Button variant="ghost">Cancel</Button></Dialog.Close>
                                <Button onClick={handleSave} icon={Save}>Save Blog</Button>
                            </div>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    );
}
