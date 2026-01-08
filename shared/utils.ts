// Shared Utilities

export function generateId(): string {
    return crypto.randomUUID();
}

export function formatDate(date: Date): string {
    return date.toISOString();
}

export function getCurrentTimestamp(): Date {
    return new Date();
}

export function createApiResponse<T>(
    success: boolean,
    data?: T,
    error?: string,
) {
    return {
        success,
        data,
        error,
        timestamp: getCurrentTimestamp(),
    };
}

export function logRequest(method: string, path: string) {
    console.log(`[${new Date().toISOString()}] ${method} ${path}`);
}
