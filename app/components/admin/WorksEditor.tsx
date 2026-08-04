import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Plus, Trash, Save, X } from "lucide-react";
import type { Work } from "../../root/Work";
import { InputGroup, TextAreaGroup, Button } from "./AdminUI";
import { API_URL } from "./constants";
import { toast } from "sonner";


export function WorksEditor() {
    const [works, setWorks] = useState<Work[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [currentWork, setCurrentWork] = useState<Partial<Work>>({});

    useEffect(() => { fetchWorks() }, []);
    const fetchWorks = () => fetch(`${API_URL}/works`).then(r => r.json()).then(d => setWorks(d.sort((a: any, b: any) => a.order - b.order)));

    const handleSave = async () => {
        const method = currentWork.id ? 'PUT' : 'POST';
        const url = currentWork.id ? `${API_URL}/works/${currentWork.id}` : `${API_URL}/works`;
        // Defaults
        if (!currentWork.links) currentWork.links = [];
        if (!currentWork.tags) currentWork.tags = [];

        try {
            await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(currentWork) });
            toast.success(currentWork.id ? "Project updated" : "Project created");
            setIsOpen(false);
            fetchWorks();
        } catch (e) {
            toast.error("Failed to save project");
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete work?")) return;
        try {
            await fetch(`${API_URL}/works/${id}`, { method: 'DELETE' });
            toast.success("Project deleted");
            fetchWorks();
        } catch (e) {
            toast.error("Failed to delete project");
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <Button onClick={() => { setCurrentWork({ links: [], tags: [] }); setIsOpen(true); }} icon={Plus}>New Project</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {works.map(work => (
                    <div key={work.id} className="bg-dark-card border border-dark-border rounded-2xl overflow-hidden group hover:border-primary transition-all flex flex-col">
                        <div className="h-48 overflow-hidden relative">
                            <img src={work.image} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" />
                            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur text-xs font-mono px-2 py-1 rounded text-white border border-white/10">{work.year}</div>
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="text-xl font-bold text-white">{work.title}</h4>
                            </div>
                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{work.description}</p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {work.tags.map((t, i) => <span key={i} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-dark-accent rounded text-gray-500 border border-dark-border">{t.label}</span>)}
                            </div>

                            <div className="mt-auto pt-4 border-t border-dark-border flex gap-2">
                                <Button variant="secondary" className="flex-1 h-8 text-xs" onClick={() => { setCurrentWork(work); setIsOpen(true); }}>Edit</Button>
                                <Button variant="danger" className="h-8 w-8 px-0" onClick={() => handleDelete(work.id)} icon={Trash}></Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm data-[state=open]:animate-fade-in z-50" />
                    <Dialog.Content aria-describedby="works-dialog-desc" className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-2xl translate-x-[-50%] translate-y-[-50%] rounded-[24px] bg-dark-card p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-dark-border focus:outline-none z-50 overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <Dialog.Title className="text-2xl font-bold text-white">{currentWork.id ? 'Edit Project' : 'New Project'}</Dialog.Title>
                                <Dialog.Description id="works-dialog-desc" className="text-gray-400 text-sm mt-1">
                                    {currentWork.id ? 'Update your project details below.' : 'Add a new project to your portfolio.'}
                                </Dialog.Description>
                            </div>
                            <Dialog.Close asChild><button className="text-gray-500 hover:text-white"><X className="w-6 h-6" /></button></Dialog.Close>
                        </div>

                        <div className="space-y-6">
                            <InputGroup label="Project Name" value={currentWork.title} onChange={(v) => setCurrentWork({ ...currentWork, title: v })} />
                            <div className="grid grid-cols-2 gap-4">
                                <InputGroup label="Year" value={currentWork.year} onChange={(v) => setCurrentWork({ ...currentWork, year: v })} />
                                <InputGroup label="Order (Sort)" value={currentWork.order} onChange={(v) => setCurrentWork({ ...currentWork, order: parseInt(v) || 0 })} type="number" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 block">Card Size</label>
                                    <select
                                        value={currentWork.size || "small"}
                                        onChange={(e) => setCurrentWork({ ...currentWork, size: e.target.value as any })}
                                        className="w-full bg-dark-accent border border-dark-border rounded-lg px-3 py-2 text-white focus:border-primary outline-none text-sm transition-all appearance-none"
                                    >
                                        <option value="small">Small (Regular)</option>
                                        <option value="large">Large (Featured)</option>
                                    </select>
                                </div>
                                <InputGroup label="Watermark Text" value={currentWork.watermark || ""} onChange={(v) => setCurrentWork({ ...currentWork, watermark: v })} />
                            </div>
                            <InputGroup label="Image URL" value={currentWork.image} onChange={(v) => setCurrentWork({ ...currentWork, image: v })} />
                            <TextAreaGroup label="Description" value={currentWork.description} onChange={(v) => setCurrentWork({ ...currentWork, description: v })} rows={3} />

                            {/* Tags and Links Logic (simplified for brevity: JSON or manual parsing) */}
                            <div className="bg-dark-accent p-4 rounded-xl border border-dark-border">
                                <h4 className="text-sm font-bold text-white mb-2">Tags (JSON)</h4>
                                <TextAreaGroup label="" value={JSON.stringify(currentWork.tags, null, 2)} onChange={(v) => {
                                    try { setCurrentWork({ ...currentWork, tags: JSON.parse(v) }) } catch (e) { }
                                }} rows={4} className="font-mono text-xs" />
                                <p className="text-[10px] text-gray-500 mt-1">Ex: [{`{"label": "React", "url": "#"}`}]</p>
                            </div>

                            <div className="bg-dark-accent p-4 rounded-xl border border-dark-border">
                                <h4 className="text-sm font-bold text-white mb-2">Links (JSON)</h4>
                                <TextAreaGroup label="" value={JSON.stringify(currentWork.links, null, 2)} onChange={(v) => {
                                    try { setCurrentWork({ ...currentWork, links: JSON.parse(v) }) } catch (e) { }
                                }} rows={4} className="font-mono text-xs" />
                                <p className="text-[10px] text-gray-500 mt-1">Ex: [{`{"url": "...", "type": "website"}`}]</p>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <Dialog.Close asChild><Button variant="ghost">Cancel</Button></Dialog.Close>
                                <Button onClick={handleSave} icon={Save}>Save Project</Button>
                            </div>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    );
}
