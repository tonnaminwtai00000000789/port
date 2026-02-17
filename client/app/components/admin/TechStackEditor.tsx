import { useState, useEffect } from "react";
import { Plus, Trash, Save, X, Code } from "lucide-react";
import type { TechStackCategory } from "../../root/TechStack";
import { Button } from "./AdminUI";
import { API_URL } from "./constants";
import { toast } from "sonner";


export function TechStackEditor() {
    const [categories, setCategories] = useState<TechStackCategory[]>([]);

    useEffect(() => { fetch(`${API_URL}/techstack`).then(r => r.json()).then(d => setCategories(d.sort((a: any, b: any) => a.order - b.order))); }, []);

    const addCategory = async () => {
        const order = categories.length > 0 ? Math.max(...categories.map(c => c.order)) + 1 : 1;
        const newCat = { category: "New Category", order, technologies: [] };
        const res = await fetch(`${API_URL}/techstack`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newCat) });
        const saved = await res.json();
        setCategories([...categories, saved]);
    };

    const updateCategoryName = async (id: number, name: string) => {
        const cat = categories.find(c => c.id === id);
        if (!cat) return;
        // optimistic
        const newCats = categories.map(c => c.id === id ? { ...c, category: name } : c);
        setCategories(newCats);
        // api
        await fetch(`${API_URL}/techstack/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...cat, category: name }) });
    };

    const addTech = async (catIndex: number) => {
        const cat = categories[catIndex];
        const updatedCat = { ...cat, technologies: [...cat.technologies, { name: "New Tech", icon: "" }] };
        await fetch(`${API_URL}/techstack/${cat.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updatedCat) });
        const newCats = [...categories]; newCats[catIndex] = updatedCat; setCategories(newCats);
    };

    const updateTech = async (catIndex: number, techIndex: number, field: string, val: string) => {
        const newCats = [...categories];
        newCats[catIndex].technologies[techIndex] = { ...newCats[catIndex].technologies[techIndex], [field]: val };
        setCategories(newCats);
        // Debounce save or save button? For simplicity, we can just save the whole category on blur or specific action. 
        // Here we just save immediately for simplicity but it might be spammy. Better: Save Button per category.
    };

    const saveCategory = async (catIndex: number) => {
        const cat = categories[catIndex];
        try {
            await fetch(`${API_URL}/techstack/${cat.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(cat) });
            toast.success(`Saved ${cat.category}`);
        } catch (e) {
            toast.error("Failed to save category");
        }
    };

    const deleteCategory = async (id: number) => {
        if (!confirm("Delete category?")) return;
        try {
            await fetch(`${API_URL}/techstack/${id}`, { method: 'DELETE' });
            toast.success("Category deleted");
            setCategories(categories.filter(c => c.id !== id));
        } catch (e) {
            toast.error("Failed to delete category");
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-end">
                <Button onClick={addCategory} icon={Plus}>Add Category</Button>
            </div>
            <div className="space-y-6">
                {categories.map((cat, catIdx) => (
                    <div key={cat.id} className="bg-dark-card border border-dark-border rounded-2xl p-6">
                        <div className="flex items-center gap-4 mb-6 border-b border-dark-border pb-4">
                            <input
                                value={cat.category}
                                onChange={(e) => updateCategoryName(cat.id, e.target.value)}
                                className="text-xl font-bold bg-transparent text-white border-2 border-transparent hover:border-dark-border focus:border-primary rounded px-2 py-1 outline-none transition-all flex-1"
                            />
                            <div className="flex gap-2">
                                <Button variant="secondary" onClick={() => saveCategory(catIdx)} className="h-8 text-xs" icon={Save}>Save</Button>
                                <Button variant="danger" onClick={() => deleteCategory(cat.id)} className="h-8 w-8 px-0" icon={Trash}></Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {cat.technologies.map((tech, techIdx) => (
                                <div key={techIdx} className="bg-dark-accent border border-dark-border p-3 rounded-xl flex items-start gap-3 group relative">
                                    <button onClick={() => {
                                        const newCats = [...categories];
                                        newCats[catIdx].technologies = newCats[catIdx].technologies.filter((_, i) => i !== techIdx);
                                        setCategories(newCats);
                                    }} className="absolute -top-2 -right-2 bg-red-500/10 text-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition"><X className="w-3 h-3" /></button>

                                    <div className="w-10 h-10 rounded-lg bg-dark-card border border-dark-border flex items-center justify-center overflow-hidden shrink-0">
                                        {tech.icon ? (
                                            tech.icon.startsWith("devicon-") ? (
                                                <i className={`${tech.icon} text-xl text-white`} />
                                            ) : (
                                                <img src={tech.icon} className="w-full h-full object-contain" />
                                            )
                                        ) : (
                                            <Code className="w-5 h-5 text-gray-600" />
                                        )}
                                    </div>
                                    <div className="flex-1 space-y-2 min-w-0">
                                        <input
                                            value={tech.name}
                                            onChange={(e) => updateTech(catIdx, techIdx, "name", e.target.value)}
                                            className="w-full bg-transparent text-sm font-medium text-white border-b border-dark-border focus:border-primary outline-none py-0.5"
                                            placeholder="Name"
                                        />
                                        <input
                                            value={tech.icon}
                                            onChange={(e) => updateTech(catIdx, techIdx, "icon", e.target.value)}
                                            className="w-full bg-transparent text-xs text-gray-500 border-b border-dark-border focus:border-primary outline-none py-0.5"
                                            placeholder="Icon URL"
                                        />
                                    </div>
                                </div>
                            ))}
                            <button onClick={() => addTech(catIdx)} className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed border-dark-border text-gray-500 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all h-full min-h-[80px]">
                                <Plus className="w-5 h-5 mb-1" />
                                <span className="text-xs font-semibold">Add Tech</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
