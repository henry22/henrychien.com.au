export default {
  name: 'workshop',
  title: 'Workshops',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Workshop Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Workshop Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
    },
    {
      name: 'level',
      title: 'Difficulty Level',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'Beginner' },
          { title: 'Intermediate', value: 'Intermediate' },
          { title: 'Advanced', value: 'Advanced' },
        ],
      },
    },
    {
      name: 'topics',
      title: 'Topics Covered',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'github',
      title: 'GitHub Repository',
      type: 'url',
    },
    {
      name: 'upcoming',
      title: 'Upcoming Session',
      type: 'object',
      fields: [
        { name: 'date', title: 'Date', type: 'date' },
        { name: 'location', title: 'Location', type: 'string' },
        { name: 'registrationLink', title: 'Registration Link', type: 'url' },
      ],
    },
    {
      name: 'recordingLink',
      title: 'Recording Link',
      type: 'url',
    },
    {
      name: 'resources',
      title: 'Workshop Resources',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'featured',
      title: 'Featured Workshop',
      type: 'boolean',
      description: 'Show this workshop in the featured section',
    },
  ],
}
