"use client";

import React from "react";
import { KeyRound, AlertCircle, ArrowLeft } from "lucide-react";

interface AdminLoginProps {
  password: string;
  setPassword: (val: string) => void;
  loginError: string;
  handleLogin: (e: React.FormEvent) => void;
}

export function AdminLogin({ password, setPassword, loginError, handleLogin }: AdminLoginProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="card-paper p-8 max-w-md w-full bg-white border-1.5 border-[#0f172a] space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-[#60a5fa] border border-[#0f172a] text-[#0f172a] flex items-center justify-center mx-auto shadow-xs">
            <KeyRound className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black font-display text-[#0f172a]">Admin Access</h1>
          <p className="text-xs text-[#475569]">เข้าสู่ระบบจัดการฐานข้อมูล Cloudflare D1</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#0f172a] mb-1">รหัสผ่านเข้าใช้งาน (Passcode)</label>
            <input
              type="password"
              required
              placeholder="กรอกรหัสผ่าน"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-3 rounded-lg bg-slate-50 border border-[#0f172a] text-xs font-semibold focus:outline-none focus:bg-white"
            />
          </div>

          {loginError && (
            <p className="text-xs font-bold text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> {loginError}
            </p>
          )}

          <button type="submit" className="btn-pop w-full py-3 text-xs uppercase tracking-wider">
            เข้าสู่ระบบ Admin
          </button>
        </form>

        <div className="pt-4 border-t border-slate-200 text-center">
          <a href="/" className="text-xs font-bold text-[#2563eb] hover:underline inline-flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> กลับไปยังหน้าเว็บไซต์
          </a>
        </div>
      </div>
    </div>
  );
}
