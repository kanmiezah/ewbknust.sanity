export default {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Short description shown in event listing',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
          ],
        },
      ],
      description: 'Full event details',
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'flyer',
      title: 'Event Flyer',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'isRecurring',
      title: 'Is Recurring Event?',
      type: 'boolean',
      description: 'Check if this event repeats (e.g., weekly meetings)',
      initialValue: false,
    },
    {
      name: 'programDate',
      title: 'Program Date & Time',
      type: 'datetime',
      description: 'Date and time of the event (required for non-recurring events)',
      hidden: ({document}) => document?.isRecurring === true,
    },
    {
      name: 'recurrenceType',
      title: 'Recurrence Type',
      type: 'string',
      options: {
        list: [
          {title: 'Weekly', value: 'weekly'},
          {title: 'Monthly', value: 'monthly'},
          {title: 'Daily', value: 'daily'},
        ],
      },
      hidden: ({document}) => document?.isRecurring !== true,
      validation: (Rule) =>
        Rule.custom((recurrenceType, context) => {
          const isRecurring = context.document?.isRecurring
          if (isRecurring && !recurrenceType) {
            return 'Recurrence type is required for recurring events'
          }
          return true
        }),
    },
    {
      name: 'dayOfWeek',
      title: 'Day of Week',
      type: 'number',
      description: 'Select day: 0=Sunday, 1=Monday, 2=Tuesday, etc.',
      options: {
        list: [
          {title: 'Sunday', value: 0},
          {title: 'Monday', value: 1},
          {title: 'Tuesday', value: 2},
          {title: 'Wednesday', value: 3},
          {title: 'Thursday', value: 4},
          {title: 'Friday', value: 5},
          {title: 'Saturday', value: 6},
        ],
      },
      hidden: ({document}) => document?.isRecurring !== true,
      validation: (Rule) =>
        Rule.custom((dayOfWeek, context) => {
          const isRecurring = context.document?.isRecurring
          if (isRecurring && dayOfWeek === undefined) {
            return 'Day of week is required for recurring events'
          }
          return true
        }),
    },
    {
      name: 'time',
      title: 'Time',
      type: 'string',
      description: 'e.g., 5pm - 6pm',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'venue',
      title: 'Venue',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'day',
      title: 'Day (Legacy)',
      type: 'string',
      description: 'Legacy field - use dayOfWeek for recurring events',
      hidden: true,
    },
    {
      name: 'month',
      title: 'Month (Legacy)',
      type: 'string',
      description: 'Legacy field - use programDate instead',
      hidden: true,
    },
  ],
  orderings: [
    {
      title: 'Program Date, Upcoming First',
      name: 'programDateAsc',
      by: [{field: 'programDate', direction: 'asc'}],
    },
    {
      title: 'Program Date, Recent First',
      name: 'programDateDesc',
      by: [{field: 'programDate', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'venue',
      media: 'flyer',
      isRecurring: 'isRecurring',
      programDate: 'programDate',
      recurrenceType: 'recurrenceType',
    },
    prepare(selection) {
      const {title, subtitle, media, isRecurring, programDate, recurrenceType} = selection
      const dateStr = isRecurring
        ? `Recurring (${recurrenceType || 'weekly'})`
        : programDate
          ? new Date(programDate).toLocaleDateString()
          : 'No date set'
      return {
        title: title,
        subtitle: `${subtitle} • ${dateStr}`,
        media: media,
      }
    },
  },
}
