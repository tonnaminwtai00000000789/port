interface CacheEntry<T> {
  data: T;
  timestamp: number;
  isFetching?: boolean;
}

const memoryStore = new Map<string, CacheEntry<any>>();

export async function getCachedData<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttlMs: number = 600000 // 10 minutes default
): Promise<T> {
  const now = Date.now();
  const cached = memoryStore.get(key);

  if (cached) {
    const isStale = now - cached.timestamp > ttlMs;

    if (isStale && !cached.isFetching) {
      cached.isFetching = true;
      // Trigger background revalidation
      fetchFn()
        .then((freshData) => {
          memoryStore.set(key, {
            data: freshData,
            timestamp: Date.now(),
            isFetching: false,
          });
        })
        .catch((err) => {
          console.error(`Background revalidate failed for key [${key}]:`, err);
          cached.isFetching = false;
        });
    }

    return cached.data;
  }

  // Cache miss: fetch synchronously
  const freshData = await fetchFn();
  memoryStore.set(key, {
    data: freshData,
    timestamp: Date.now(),
    isFetching: false,
  });

  return freshData;
}

export function clearCache(key?: string): void {
  if (key) {
    memoryStore.delete(key);
  } else {
    memoryStore.clear();
  }
}
