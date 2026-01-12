export default {
  name: 'team',
  title: 'Team',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'position',
      title: 'Position',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which team member appears (lower numbers appear first)',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
      description: 'Short biography of the team member',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'facebookProfile',
      title: 'Facebook Profile',
      type: 'url',
    },
    {
      name: 'linkedProfile',
      title: 'LinkedIn Profile',
      type: 'url',
    },
    {
      name: 'xProfile',
      title: 'X (Twitter) Profile',
      type: 'url',
    },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'position',
      media: 'profileImage',
      order: 'order',
    },
    prepare(selection) {
      const {title, subtitle, media, order} = selection
      return {
        title: title,
        subtitle: `${subtitle} ${order ? `(Order: ${order})` : ''}`,
        media: media,
      }
    },
  },
}
