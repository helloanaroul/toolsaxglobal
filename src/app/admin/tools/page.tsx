
'use client';

import { useEffect, useState } from 'react';
import type { Tool } from '../types';
import ToolsManagement from '../dashboard/ToolsManagement';
import { get, ref, query, orderByChild } from 'firebase/database';
import { initializeAppOnce } from '@/lib/firebase';
import { getDatabase } from 'firebase/database';


async function fetchTools(): Promise<Tool[]> {
    initializeAppOnce();
    const db = getDatabase();
    if (!db) return [];

    const toolsRef = query(ref(db, 'tools'), orderByChild('order'));
    const snapshot = await get(toolsRef);
    if (snapshot.exists()) {
        const toolsData = snapshot.val();
        return Object.keys(toolsData).map(key => ({
            ...toolsData[key],
            id: key,
        })).sort((a, b) => a.order - b.order);
    }
    return [];
}


export default function AdminToolsPage() {
    const [tools, setTools] = useState<Tool[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTools().then(loadedTools => {
            setTools(loadedTools);
            setLoading(false);
        });
    }, []);

    return (
        <div className="space-y-4">
            <ToolsManagement initialTools={tools} isLoading={loading} />
        </div>
    );
}
