import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("admin", "routes/admin.tsx"),
    route("blogs/:slug", "routes/post.tsx"),
    route("blogs", "routes/blogs.tsx"),
    route("works", "routes/works.tsx"),
] satisfies RouteConfig;
