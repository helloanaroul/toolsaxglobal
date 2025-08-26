
'use client';

import { useMemo } from 'react';
import type { Tool } from '@/lib/types';
import ToolCard from './ToolCard';
import FeaturesSection from './FeaturesSection';
import SectionDivider from './SectionDivider';
import FirebaseStats from './FirebaseStats';
import { useAppState } from '@/contexts/AppStateContext';

interface HomePageClientProps {
  tools: Tool[];
}

export default function HomePageClient({ tools }: HomePageClientProps) {
  const { searchQuery, selectedCategory } = useAppState();
  
  const filteredTools = useMemo(() => {
    if (!tools) return [];
    return tools.filter(tool => {
        if (!tool.id || !tool.name) {
            return false;
        }
        const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
        const searchInput = searchQuery.toLowerCase();
        const matchesSearch =
            tool.name.toLowerCase().includes(searchInput) ||
            (tool.description && tool.description.toLowerCase().includes(searchInput));
        return matchesCategory && matchesSearch;
    });
  }, [tools, searchQuery, selectedCategory]);

  const originalIndexMap = useMemo(() => {
    const map = new Map<string, number>();
    if (!tools) return map;
    tools.forEach((tool, index) => {
      if (tool.id) {
        map.set(tool.id, index);
      }
    });
    return map;
  }, [tools]);
  
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <ToolCard 
              key={tool.id} 
              tool={tool} 
              index={originalIndexMap.get(tool.id) ?? 0}
          />
        ))}
      </div>
      
      {filteredTools.length === 0 && (
        <div className="text-center py-16 col-span-full">
            <h2 className="text-2xl font-semibold">No tools found</h2>
            <p className="text-muted-foreground mt-2">Try adjusting your search or filter.</p>
        </div>
      )}

      <SectionDivider />
      <FeaturesSection />

      <SectionDivider />
      <FirebaseStats />
    </>
  );
}
