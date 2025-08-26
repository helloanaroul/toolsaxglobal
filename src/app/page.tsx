
import HomePageClient from '@/components/HomePageClient';
import type { Tool } from '@/lib/types';
import { getTools } from '@/lib/firebase';
import Header from '@/components/Header';
import SectionDivider from '@/components/SectionDivider';

export default async function Home() {
    const allTools: Tool[] = await getTools();
    const enabledTools = allTools.filter(tool => tool.isEnabled);

    return (
      <div className="container mx-auto px-4">
        <Header />
        <SectionDivider />
        <HomePageClient tools={enabledTools} />
      </div>
    );
}
