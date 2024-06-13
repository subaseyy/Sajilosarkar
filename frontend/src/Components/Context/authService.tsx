// authService.ts
export async function authenticate(username: string, password: string): Promise<{ token: string, username: string }> {
    const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        const data: { token: string, username: string } = await response.json();
        return data;
    } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }
}
