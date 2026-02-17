export function getApiUrl(path: string, request?: Request): string {
    // Normalize the path: ensure it reflects the server-side route (without /api prefix if that's internal)
    const cleanPath = path.startsWith('/api') ? path.substring(4) : path;
    const normalizedPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;

    // If we are on the server (SSR)
    if (typeof window === 'undefined') {
        // Priority 1: Use INTERNAL_API_URL (for Docker internal networking)
        const internalUrl = process.env.INTERNAL_API_URL;
        if (internalUrl) {
            return `${internalUrl}${normalizedPath}`;
        }

        // Priority 2: If we are on localhost (dev or local prod test), hit the backend directly
        if (request) {
            const url = new URL(request.url);
            if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
                return `http://localhost:3763${normalizedPath}`;
            }
        }

        // Priority 3: Fallback for relative fetches if origin is available
        if (request) {
            const { origin } = new URL(request.url);
            // If the origin is where we expect the API to be proxied
            return `${origin}/api${normalizedPath}`;
        }

        // Final Fallback: Production API URL
        return `https://api6.theijon.online${normalizedPath}`;
    }

    // If we are on the client, use relative /api path
    return `/api${normalizedPath}`;
}
