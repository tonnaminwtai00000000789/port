import { useState, useEffect } from "react";
import { Mail, Plus, Trash, Save, Link as LinkIcon, Globe } from "lucide-react";
import type { ContactData } from "../../root/Contact";
import { InputGroup, Button } from "./AdminUI";
import { API_URL } from "./constants";
import { toast } from "sonner";

export function ContactEditor() {
    const [data, setData] = useState<ContactData | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetch(`${API_URL}/contact`).then(res => res.json()).then(d => { setData(d); setLoading(false); });
    }, []);

    const handleSave = async () => {
        if (!data) return;
        setSaving(true);
        try {
            await fetch(`${API_URL}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            toast.success("Contact information updated");
        } catch (e) {
            toast.error("Error saving contact data");
        } finally {
            setSaving(false);
        }
    };

    const addSocial = () => {
        if (!data) return;
        setData({
            ...data,
            socials: [...data.socials, { platform: "New", username: "", url: "", icon: "devicon-github-original" }]
        });
    };

    const updateSocial = (idx: number, field: string, val: string) => {
        if (!data) return;
        const newSocials = [...data.socials];
        newSocials[idx] = { ...newSocials[idx], [field]: val };
        setData({ ...data, socials: newSocials });
    };

    const deleteSocial = (idx: number) => {
        if (!data) return;
        setData({
            ...data,
            socials: data.socials.filter((_, i) => i !== idx)
        });
    };

    if (loading) return <div>Loading...</div>;

    // Initial state if no data exists
    const displayData = data || { email: "", socials: [] } as any;

    return (
        <div className="space-y-8 max-w-4xl">
            <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Mail className="w-5 h-5 text-primary" /> Core Contact</h3>
                <InputGroup
                    label="Primary Email"
                    value={displayData.email}
                    onChange={(v) => setData({ ...displayData, email: v })}
                    placeholder="your@email.com"
                />
            </div>

            <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2"><Globe className="w-5 h-5 text-primary" /> Social Links</h3>
                    <Button variant="secondary" onClick={addSocial} icon={Plus} className="text-xs h-8">Add Social</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {displayData.socials.map((social: any, idx: number) => (
                        <div key={idx} className="bg-dark-accent border border-dark-border rounded-xl p-4 relative group">
                            <button
                                onClick={() => deleteSocial(idx)}
                                className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition p-1 hover:bg-red-500/10 rounded"
                            >
                                <Trash className="w-4 h-4" />
                            </button>

                            <div className="space-y-3">
                                <InputGroup label="Platform" value={social.platform} onChange={(v) => updateSocial(idx, "platform", v)} />
                                <div className="grid grid-cols-2 gap-3">
                                    <InputGroup label="Username" value={social.username} onChange={(v) => updateSocial(idx, "username", v)} />
                                    <InputGroup label="Icon Class" value={social.icon} onChange={(v) => updateSocial(idx, "icon", v)} placeholder="devicon-..." />
                                </div>
                                <InputGroup label="Profile URL" value={social.url} onChange={(v) => updateSocial(idx, "url", v)} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-dark-border">
                <Button onClick={handleSave} disabled={saving} icon={Save}>Save Contact Info</Button>
            </div>
        </div>
    );
}
