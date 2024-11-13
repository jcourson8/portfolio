import { CollectionConfig } from 'payload'
import { HTMLConverterFeature, lexicalEditor, lexicalHTML, BlocksFeature, defaultEditorFeatures } from '@payloadcms/richtext-lexical'
import { Code } from '@/blocks/Code/config'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,  // Enable drafts
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'year',
      type: 'number',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'projectUrl',
      type: 'text',
      label: 'Project URL',
    },
    {
      name: 'githubUrl',
      type: 'text',
      label: 'GitHub URL',
    },
    {
      name: 'projectImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'technologies',
      type: 'array',
      label: 'Technologies Used',
      fields: [
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          BlocksFeature({
            blocks: [Code],
          }),
        ],
      }),
      required: true,
    },
    // lexicalHTML('content', { name: 'content_html' }),
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Project',
    },
    {
      name: 'completionDate',
      type: 'date',
      label: 'Completion Date',
    },
  ],
}
