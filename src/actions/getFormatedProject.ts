'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { Project } from '@/payload-types'

export async function getFormattedProjects(): Promise<string> {
    try {
      const payload = await getPayload({
        config,
      })
      const projectsData = await payload.find({
        collection: 'projects',
        depth: 1,
      })
  
      // Format projects into a concise text summary
      const formattedProjects = projectsData.docs.map((project) => {
        let plainText = '';
        
        // Add basic project information
        plainText += `${project.title}\n`;
        plainText += `Year: ${project.year}\n`;
        plainText += `Description: ${project.description}\n`;
        
        // Add technologies if they exist
        if (project.technologies && project.technologies.length > 0) {
          plainText += 'Technologies: ';
          plainText += project.technologies.map((tech: any) => tech.name).join(', ');
          plainText += '\n';
        }
  
        // Add URLs if they exist
        if (project.projectUrl) {
          plainText += `Project URL: ${project.projectUrl}\n`;
        }
        if (project.githubUrl) {
          plainText += `GitHub URL: ${project.githubUrl}\n`;
        }
  
        // Convert rich text content if it exists
        if (project.content && typeof project.content === 'object' && 'root' in project.content) {
          const contentText = extractPlainTextFromLexical(project.content);
          if (contentText) {
            plainText += `\nContent:\n${contentText}\n`;
          }
        }
  
        plainText += '\n---\n\n';
        return plainText;
      }).join('');
  
      return formattedProjects;
    } catch (error) {
      console.error('Error fetching formatted projects:', error)
      throw new Error('Failed to fetch formatted projects')
    }
  }
  
  function extractPlainTextFromLexical(content: any): string {
    try {
      // Extract text from each node in the content
      const extractTextFromNode = (node: any): string => {
        if (!node) return '';
  
        if (node.type === 'text') {
          return node.text;
        }
  
        if (node.children) {
          return node.children.map(extractTextFromNode).join(' ');
        }
  
        return '';
      };
  
      // Process all root children
      if (content.root?.children) {
        return content.root.children.map(extractTextFromNode).join('\n').trim();
      }
  
      return '';
    } catch (error) {
      console.error('Error extracting plain text from Lexical content:', error);
      return '';
    }
  }