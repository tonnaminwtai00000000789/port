import { useState, useEffect } from "react";
import { Mail, Trash, CheckCircle, Clock, Archive, User, MessageSquare } from "lucide-react";
import { Button } from "./AdminUI";
import { API_URL } from "./constants";
import { toast } from "sonner";

interface Message {
    id: number;
    name: string;
    email: string;
    content: string;
    status: 'unread' | 'read' | 'archived';
    createdAt: string;
}

export function InboxEditor() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = () => {
        fetch(`${API_URL}/messages`)
            .then(res => res.json())
            .then(d => { setMessages(d); setLoading(false); });
    };

    const updateStatus = async (id: number, status: 'unread' | 'read' | 'archived') => {
        try {
            await fetch(`${API_URL}/messages/${id}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            setMessages(messages.map(m => m.id === id ? { ...m, status } : m));
            toast.success(`Marked as ${status}`);
        } catch (e) {
            toast.error("Failed to update status");
        }
    };

    const deleteMessage = async (id: number) => {
        if (!confirm("Delete this message?")) return;
        try {
            await fetch(`${API_URL}/messages/${id}`, { method: 'DELETE' });
            setMessages(messages.filter(m => m.id !== id));
            toast.success("Message deleted");
        } catch (e) {
            toast.error("Failed to delete message");
        }
    };

    if (loading) return <div>Loading messages...</div>;

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
                {messages.length === 0 ? (
                    <div className="bg-dark-card border border-dark-border rounded-2xl p-12 text-center">
                        <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400">No messages yet.</p>
                    </div>
                ) : (
                    messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`bg-dark-card border rounded-2xl p-6 transition-all ${msg.status === 'unread' ? 'border-primary/50 bg-primary/5' : 'border-dark-border'}`}
                        >
                            <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-xl ${msg.status === 'unread' ? 'bg-primary text-white' : 'bg-dark-accent text-gray-400'}`}>
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white flex items-center gap-2">
                                            {msg.name}
                                            {msg.status === 'unread' && <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />}
                                        </h4>
                                        <p className="text-sm text-gray-400">{msg.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                                    <Clock className="w-3 h-3" />
                                    {new Date(msg.createdAt).toLocaleString()}
                                </div>
                            </div>

                            <div className="bg-dark-accent/50 border border-dark-border rounded-xl p-4 mb-6 text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                                {msg.content}
                            </div>

                            <div className="flex flex-wrap gap-2 justify-end">
                                {msg.status === 'unread' ? (
                                    <Button variant="primary" onClick={() => updateStatus(msg.id, 'read')} className="h-8 text-xs" icon={CheckCircle}>Mark Read</Button>
                                ) : (
                                    <Button variant="secondary" onClick={() => updateStatus(msg.id, 'unread')} className="h-8 text-xs" icon={Clock}>Mark Unread</Button>
                                )}
                                <Button variant="secondary" onClick={() => updateStatus(msg.id, 'archived')} className="h-8 text-xs" icon={Archive}>Archive</Button>
                                <Button variant="danger" onClick={() => deleteMessage(msg.id)} className="h-8 w-8 px-0" icon={Trash}></Button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
