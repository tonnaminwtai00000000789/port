import { useState } from "react";
import { LayoutDashboard, Lock, User } from "lucide-react";
import { InputGroup, Button } from "./AdminUI";
import { getApiUrl } from "../../utils/api";
import { toast } from "sonner";

export function LoginForm({ onLoginSuccess }: { onLoginSuccess: () => void }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(getApiUrl("/auth/login"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                toast.success("เข้าสู่ระบบสำเร็จ");
                onLoginSuccess();
            } else {
                toast.error(data.message || "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
            }
        } catch (error) {
            toast.error("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
            console.error("Login error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-dark-bg text-gray-200 flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-md">
                <div className="bg-dark-card border border-dark-border rounded-2xl p-8 shadow-2xl">
                    {/* Header */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 rounded-xl bg-primary/20 text-primary flex items-center justify-center border border-primary/20 mb-4">
                            <LayoutDashboard className="w-8 h-8" />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">Admin Login</h1>
                        <p className="text-sm text-gray-400">กรุณาเข้าสู่ระบบเพื่อจัดการเว็บไซต์</p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <InputGroup
                            label="Username"
                            value={username}
                            onChange={setUsername}
                            placeholder="กรอกชื่อผู้ใช้"
                            type="text"
                        />

                        <InputGroup
                            label="Password"
                            value={password}
                            onChange={setPassword}
                            placeholder="กรอกรหัสผ่าน"
                            type="password"
                        />

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full mt-6"
                            disabled={loading || !username || !password}
                            icon={Lock}
                        >
                            {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
                        </Button>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 pt-6 border-t border-dark-border">
                        <a
                            href="/"
                            className="text-xs text-gray-500 hover:text-primary transition-colors flex items-center justify-center gap-1"
                        >
                            <User className="w-3 h-3" />
                            กลับไปหน้าแรก
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
