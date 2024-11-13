import { TOCItem } from "@/components/TableOfContents";

export function generateTableOfContents(content: any): TOCItem[] {
    const tableOfContents: TOCItem[] = [];
    
    if (!content?.root?.children) return tableOfContents;
  
    content.root.children.forEach((node: any) => {
      if (node.type === 'heading' && (node.tag === 'h1' || node.tag === 'h2')) {
        const text = node.children?.[0]?.text || '';
        const id = `heading-${text.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
        
        // Also add the ID to the actual heading node for scrolling
        node.props = {
          ...node.props,
          id
        };
        
        tableOfContents.push({
          id,
          text,
          level: node.tag === 'h1' ? 1 : 2
        });
      }
    });
  
    return tableOfContents;
  }
  