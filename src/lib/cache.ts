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

  const fetchWithTimeout = async (): Promise<T> => {
    const timeoutPromise = new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Timeout fetching [${key}]`)), 2500)
    );
    return Promise.race([fetchFn(), timeoutPromise]);
  };

  if (cached) {
    const isStale = now - cached.timestamp > ttlMs;

    if (isStale && !cached.isFetching) {
      cached.isFetching = true;
      // Background revalidation
      fetchWithTimeout()
        .then((freshData) => {
          if (freshData) {
            memoryStore.set(key, {
              data: freshData,
              timestamp: Date.now(),
              isFetching: false,
            });
          } else {
            cached.isFetching = false;
          }
        })
        .catch((err) => {
          console.warn(`Background revalidate failed for [${key}]:`, err.message);
          cached.isFetching = false;
        });
    }

    return cached.data;
  }

  // Cache miss
  try {
    const freshData = await fetchWithTimeout();
    if (freshData) {
      memoryStore.set(key, {
        data: freshData,
        timestamp: Date.now(),
        isFetching: false,
      });
      return freshData;
    }
  } catch (err: any) {
    console.warn(`Initial fetch failed for [${key}]:`, err.message);
  }

  return null as any;
}

export function clearCache(key?: string): void {
  if (key) {
    memoryStore.delete(key);
  } else {
    memoryStore.clear();
  }
}
