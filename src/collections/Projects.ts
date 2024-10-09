import { CollectionConfig } from "payload"


export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
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