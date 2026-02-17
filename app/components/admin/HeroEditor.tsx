import { useState, useEffect } from "react";
import { User, Loader2, Plus, Trash, Save } from "lucide-react";
import type { HeroData } from "../../root/Hero";
import { InputGroup, Button } from "./AdminUI";
import { API_URL } from "./constants";
import { toast } from "sonner";


export function HeroEditor() {
    const [data, setData] = useState<HeroData | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetch(`${API_URL}/hero`).then(res => res.json()).then(d => { setData(d); setLoading(false); });
    }, []);

    const handleSave = async () => {
        if (!data) return;
        setSaving(true);
        try {
            await fetch(`${API_URL}/hero`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
            toast.success("Hero section updated");
        } catch (e) {
            toast.error("Error saving hero data");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="flex items-center gap-2 text-gray-500"><Loader2 className="animate-spin w-5 h-5" /> Loading...</div>;
    if (!data) return <div>No data</div>;

    return (
        <div className="space-y-8 max-w-4xl">
            <div className="bg-dark-card border border-dark-border rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><User className="w-5 h-5 text-primary" /> Basic Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup label="First Name" value={data.firstName} onChange={(v) => setData({ ...data, firstName: v })} />
                    <InputGroup label="Last Name" value={data.lastName} onChange={(v) => setData({ ...data, lastName: v })} />
                    <InputGroup label="Display Name" value={data.displayName} onChange={(v) => setData({ ...data, displayName: v })} />
                    <InputGroup label="Nickname" value={data.nickname} onChange={(v) => setData({ ...data, nickname: v })} />
                    <InputGroup label="Location" value={data.location} onChange={(v) => setData({ ...data, location: v })} />
                    <InputGroup label="Emoji Status" value={data.emoji} onChange={(v) => setData({ ...data, emoji: v })} />
                    <InputGroup label="Birth Date" value={data.birthDate} onChange={(v) => setData({ ...data, birthDate: v })} type="date" />
                    <InputGroup label="Work Start Date" value={data.startDate} onChange={(v) => setData({ ...data, startDate: v })} type="date" />
                    <InputGroup label="Webring URL" value={data.webringUrl || ""} onChange={(v) => setData({ ...data, webringUrl: v })} />
                    <div className="md:col-span-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2 block">Profile Image URL</label>
                        <div className="flex gap-4 items-center">
                            <img src={data.profileImage} alt="Profile" className="w-16 h-16 rounded-full border-2 border-dark-border object-cover" />
                            <input
                                type="text"
                                value={data.profileImage || ""}
                                onChange={(e) => setData({ ...data, profileImage: e.target.value })}
                                className="flex-1 bg-dark-accent border border-dark-border rounded-lg px-3 py-2 text-white focus:border-primary outline-none text-sm"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-dark-card border border-dark-border rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2"><Plus className="w-5 h-5 text-primary" /> Positions</h3>
                    <Button variant="secondary" onClick={() => setData({ ...data, positions: [...data.positions, { logo: "", title: "New Role", organization: "Company", organizationUrl: "", since: "2024" }] })} icon={Plus} className="text-xs py-1.5 h-8">Add</Button>
                </div>
                <div className="flex flex-col gap-4">
                    {data.positions.map((pos, idx) => (
                        <div key={idx} className="bg-dark-accent border border-dark-border rounded-xl p-5 relative group hover:border-primary/50 transition-colors">
                            <button onClick={() => setData({ ...data, positions: data.positions.filter((_, i) => i !== idx) })} className="absolute top-3 right-3 text-red-500 hover:bg-red-500/10 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition"><Trash className="w-4 h-4" /></button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputGroup label="Title" value={pos.title} onChange={(v) => { const newPos = [...data.positions]; newPos[idx].title = v; setData({ ...data, positions: newPos }); }} />
                                <InputGroup label="Company" value={pos.organization} onChange={(v) => { const newPos = [...data.positions]; newPos[idx].organization = v; setData({ ...data, positions: newPos }); }} />
                                <InputGroup label="URL" value={pos.organizationUrl} onChange={(v) => { const newPos = [...data.positions]; newPos[idx].organizationUrl = v; setData({ ...data, positions: newPos }); }} />
                                <InputGroup label="Since" value={pos.since} onChange={(v) => { const newPos = [...data.positions]; newPos[idx].since = v; setData({ ...data, positions: newPos }); }} />
                                <div className="md:col-span-2">
                                    <InputGroup label="Logo URL" value={pos.logo} onChange={(v) => { const newPos = [...data.positions]; newPos[idx].logo = v; setData({ ...data, positions: newPos }); }} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-dark-border">
                <Button onClick={handleSave} disabled={saving} icon={Save} className="w-full md:w-auto">Save Changes</Button>
            </div>
        </div>
    );
}
