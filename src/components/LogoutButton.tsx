'use client';

import { usePrivy } from '@privy-io/react-auth';

export function LogoutButton() {
    const { logout } = usePrivy();

    return (
        <button
            onClick={logout}
            className="w-full px-4 py-2 mt-4 text-sm font-medium text-red-600 hover:text-red-700 focus:outline-none"
        >
            Sign Out
        </button>
    );
}