import { useState, useEffect } from "react";
import { Plus, Trash, Save } from "lucide-react";
import type { AboutMeData } from "../../root/Aboutme";
import { InputGroup, Button } from "./AdminUI";
import { API_URL } from "./constants";
import { toast } from "sonner";


export function AboutMeEditor() {
    const [data, setData] = useState<AboutMeData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetch(`${API_URL}/aboutme`).then(res => res.json()).then(d => { setData(d); setLoading(false); }); }, []);

    const handleSave = async () => {
        if (!data) return;
        await fetch(`${API_URL}/aboutme`,
            { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
        ).then(
            () => {
                toast.success("Saved successfully");
            }
        ).catch(
            () => {
                toast.error("Failed to save");
            }
        );
    };

    if (loading) return <div>Loading...</div>;
    if (!data) return <div>No data</div>;

    return (
        <div className="space-y-8 max-w-4xl">
            <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup label="Nickname" value={data.nickname} onChange={(v) => setData({ ...data, nickname: v })} />
                    <InputGroup label="Status" value={data.status} onChange={(v) => setData({ ...data, status: v })} />
                    <InputGroup label="Status Link" value={data.statusLink || ""} onChange={(v) => setData({ ...data, statusLink: v })} />
                    <InputGroup label="Full Name" value={data.fullName} onChange={(v) => setData({ ...data, fullName: v })} />
                    <InputGroup label="Birthday String" value={data.birthday} onChange={(v) => setData({ ...data, birthday: v })} />
                    <InputGroup label="Location" value={data.location} onChange={(v) => setData({ ...data, location: v })} />
                </div>
            </div>
            <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white">Fun Facts</h3>
                    <Button variant="secondary" onClick={() => setData({ ...data, facts: [...data.facts, { title: "Fact", subtitle: "Detail", image: "", type: "image" }] })} icon={Plus} className="text-xs h-8">Add</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.facts.map((fact, idx) => (
                        <div key={idx} className="bg-dark-accent border border-dark-border rounded-xl p-4 relative group hover:border-primary/50 transition-all hover:-translate-y-1">
                            <button onClick={() => setData({ ...data, facts: data.facts.filter((_, i) => i !== idx) })} className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition z-10 bg-dark-accent rounded-full p-1"><Trash className="w-3 h-3" /></button>
                            <div className="mb-3 w-full h-24 bg-dark-card rounded-lg overflow-hidden border border-dark-border">
                                {fact.image && <img src={fact.image} className="w-full h-full object-cover" />}
                            </div>
                            <InputGroup label="Title" value={fact.title} onChange={(v) => { const newFacts = [...data.facts]; newFacts[idx].title = v; setData({ ...data, facts: newFacts }) }} className="mb-2" />
                            <InputGroup label="Subtitle" value={fact.subtitle} onChange={(v) => { const newFacts = [...data.facts]; newFacts[idx].subtitle = v; setData({ ...data, facts: newFacts }) }} className="mb-2" />
                            <div className="space-y-2 mb-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 block">Fact Type</label>
                                <select
                                    value={fact.type}
                                    onChange={(e) => { const newFacts = [...data.facts]; newFacts[idx].type = e.target.value as any; setData({ ...data, facts: newFacts }) }}
                                    className="w-full bg-dark-accent border border-dark-border rounded-lg px-3 py-2 text-white focus:border-primary outline-none text-xs appearance-none"
                                >
                                    <option value="image">Image</option>
                                    <option value="icon">Icon / Text</option>
                                </select>
                            </div>
                            <InputGroup label="Image / Icon Class" value={fact.image} onChange={(v) => { const newFacts = [...data.facts]; newFacts[idx].image = v; setData({ ...data, facts: newFacts }) }} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-end pt-4"><Button onClick={handleSave} icon={Save}>Save All</Button></div>
        </div>
    );
}
