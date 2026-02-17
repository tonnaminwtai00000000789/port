import type { ReactNode } from "react";

export function InputGroup({ label, value, onChange, type = "text", placeholder, className = "" }: { label: string; value: any; onChange: (val: string) => void; type?: string; placeholder?: string; className?: string }) {
    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">{label}</label>
            <input
                type={type}
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-dark-accent border border-dark-border rounded-lg px-3 py-2 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-600 text-sm"
            />
        </div>
    );
}

export function TextAreaGroup({ label, value, onChange, placeholder, className = "", rows = 4 }: { label: string; value: any; onChange: (val: string) => void; placeholder?: string; className?: string; rows?: number }) {
    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">{label}</label>
            <textarea
                rows={rows}
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-dark-accent border border-dark-border rounded-lg px-3 py-2 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-600 font-mono text-xs leading-relaxed"
            />
        </div>
    );
}

export function Button({ children, onClick, variant = "primary", className = "", disabled = false, icon: Icon, type = "button" }: { children?: ReactNode; onClick?: () => void; variant?: "primary" | "secondary" | "danger" | "ghost"; className?: string; disabled?: boolean; icon?: any; type?: "button" | "submit" | "reset" }) {
    const baseStyle = "flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm cursor-pointer";
    const variants = {
        primary: "bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/20 border border-primary",
        secondary: "bg-dark-card text-white border border-dark-border hover:border-primary hover:text-primary",
        danger: "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/50",
        ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-dark-border/30"
    };

    return (
        <button type={type} onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`} disabled={disabled}>
            {Icon && <Icon className="w-4 h-4 shrink-0" strokeWidth={2} />}
            {children}
        </button>
    );
}
