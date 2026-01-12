export default {
  name: 'impactStats',
  title: 'Impact Stats',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'Example: 200+, 45, 12',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Controls display order',
    },
  ],
}
