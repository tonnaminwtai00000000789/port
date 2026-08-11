import React from "react";

interface InboxViewerProps {
  inboxData: any[];
}

export function InboxViewer({ inboxData }: InboxViewerProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black font-display text-[#0f172a]">Inbox Messages</h1>
        <p className="text-xs text-[#475569]">ข้อความติดต่อที่ส่งมาจากผู้เยี่ยมชมเว็บไซต์ ({inboxData.length} ข้อความ)</p>
      </div>

      <div className="space-y-3">
        {inboxData.length === 0 ? (
          <div className="card-paper p-8 text-center text-xs font-bold text-[#475569] bg-white">
            ยังไม่มีข้อความใหม่ใน Inbox
          </div>
        ) : (
          inboxData.map((msg, idx) => (
            <div key={idx} className="card-paper p-4 bg-white border-1.5 border-[#0f172a] space-y-1">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-bold text-[#0f172a]">{msg.name} ({msg.email})</h4>
                <span className="text-[10px] text-[#475569]">{msg.created_at || "เพิ่งส่งเมื่อครู่"}</span>
              </div>
              <p className="text-xs text-[#475569]">{msg.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
