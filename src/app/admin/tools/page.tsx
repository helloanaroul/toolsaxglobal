
'use client';

import { useEffect, useState } from 'react';
import type { Tool } from '../types';
import ToolsManagement from '../dashboard/ToolsManagement';
import { getTools } from '@/lib/firebase';

export default function AdminToolsPage() {
    const [tools, setTools] = useState<Tool[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTools().then(loadedTools => {
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
