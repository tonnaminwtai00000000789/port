import { NextRequest, NextResponse } from "next/server";
import {
  getHero,
  getAboutMe,
  getTechStack,
  getWorks,
  getContact,
  getBlogPosts,
  getMessages,
  saveHero,
  saveAbout,
  saveTechStack,
  saveWorks,
  saveBlogs,
  saveContact,
} from "@/lib/db";

export async function GET() {
  try {
    const [hero, aboutMe, techStack, works, contact, blogs, messages] =
      await Promise.all([
        getHero(),
        getAboutMe(),
        getTechStack(),
        getWorks(),
        getContact(),
        getBlogPosts(),
        getMessages(),
      ]);

    return NextResponse.json({
      hero,
      aboutMe,
      techStack,
      works,
      contact,
      blogs,
      messages,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, payload } = body;

    switch (action) {
      case "save_hero":
        await saveHero(payload);
        break;
      case "save_about":
        await saveAbout(payload);
        break;
      case "save_tech":
        await saveTechStack(payload);
        break;
      case "save_works":
        await saveWorks(payload);
        break;
      case "save_blogs":
        await saveBlogs(payload);
        break;
      case "save_contact":
        await saveContact(payload);
        break;
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
