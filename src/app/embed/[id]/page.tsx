
import { notFound } from 'next/navigation';
import type { Tool } from '@/lib/types';
import { getTools, initializeAppOnce } from '@/lib/firebase';
import ToolRenderer from '@/components/tools/ToolRenderer';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { CustomThemeProvider } from '@/components/ThemeProvider';

async function getToolForEmbed(id: string): Promise<Tool | undefined> {
  initializeAppOnce();
  const allTools = await getTools();
  const tool = allTools.find((tool) => tool.id === id);

  if (!tool || !tool.isEnabled) {
    return undefined;
  }

  return tool;
}

export default async function EmbedPage({ params, searchParams }: { params: { id: string }, searchParams: { theme?: string } }) {
  const { id } = params;
  const tool = await getToolForEmbed(id);

  if (!tool) {
    notFound();
  }

  const themeClass = searchParams.theme === 'dark' ? 'dark' : '';

  return (
    <CustomThemeProvider>
        <div className={cn("p-4 bg-background h-screen w-screen", themeClass)}>
            <ToolRenderer tool={tool} />
            <Toaster />
        </div>
    </CustomThemeProvider>
  );
}
