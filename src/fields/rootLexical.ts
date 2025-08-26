import type { FieldHook } from 'payload'

import {
  AlignFeature,
  BlockquoteFeature,
  BlocksFeature,
  BoldFeature,
  ChecklistFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineCodeFeature,
  InlineToolbarFeature,
  IndentFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  RelationshipFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  UnderlineFeature,
  UnorderedListFeature,
  UploadFeature,
} from '@payloadcms/richtext-lexical'

const regenerateExcerpt: FieldHook = ({ data, value }) => {
  if (data?.content) {
    // Extract plain text from Lexical content for excerpt
    const extractTextFromLexical = (content: any): string => {
      if (typeof content === 'string') return content
      
      if (content?.root?.children) {
        return content.root.children
          .map((child: any) => {
            if (child.children) {
              return child.children
                .map((subChild: any) => subChild.text || '')
                .join('')
            }
            return child.text || ''
          })
          .join(' ')
      }
      
      return ''
    }

    const text = extractTextFromLexical(data.content)
    const excerpt = text.split(' ').slice(0, 30).join(' ')
    return excerpt.length > 0 ? excerpt : value
  }
  return value
}

const rootLexical = lexicalEditor({
  features: ({ defaultFeatures, rootFeatures }) => [
    ...rootFeatures,
    // Text Formatting Features
    ParagraphFeature(),
    HeadingFeature({
      enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    }),
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    StrikethroughFeature(),
    SubscriptFeature(),
    SuperscriptFeature(),
    InlineCodeFeature(),

    // Alignment Features
    AlignFeature(),

    // List Features
    UnorderedListFeature(),
    OrderedListFeature(),
    ChecklistFeature(),
    IndentFeature(),

    // Block Features
    BlockquoteFeature(),
    HorizontalRuleFeature(),

    // Interactive Features
    LinkFeature({
      enabledCollections: ['pages', 'posts'],
      fields: [
        {
          name: 'rel',
          label: 'Rel Attribute',
          type: 'select',
          hasMany: true,
          options: ['noopener', 'noreferrer', 'nofollow'],
          admin: {
            description: 'Add rel attributes to the link for SEO and security purposes.',
          },
        },
        {
          name: 'newTab',
          label: 'Open in new tab',
          type: 'checkbox',
        },
      ],
    }),

    // Media Features
    UploadFeature({
      collections: {
        media: {
          fields: [
            {
              name: 'alt',
              label: 'Alt Text',
              type: 'text',
              required: true,
            },
            {
              name: 'caption',
              label: 'Caption',
              type: 'text',
            },
          ],
        },
      },
    }),

    // Relationship Features
    RelationshipFeature({
      enabledCollections: ['posts', 'categories', 'pages'],
      maxDepth: 1,
    }),

    // Block Features for Rich Content
    BlocksFeature({
      blocks: [
        {
          slug: 'quote',
          labels: {
            singular: 'Quote Block',
            plural: 'Quote Blocks',
          },
          fields: [
            {
              name: 'quote',
              label: 'Quote',
              type: 'textarea',
              required: true,
            },
            {
              name: 'author',
              label: 'Author',
              type: 'text',
            },
            {
              name: 'role',
              label: 'Author Role/Title',
              type: 'text',
            },
          ],
        },
        {
          slug: 'code',
          labels: {
            singular: 'Code Block',
            plural: 'Code Blocks',
          },
          fields: [
            {
              name: 'language',
              label: 'Language',
              type: 'select',
              options: [
                { label: 'JavaScript', value: 'javascript' },
                { label: 'TypeScript', value: 'typescript' },
                { label: 'Python', value: 'python' },
                { label: 'HTML', value: 'html' },
                { label: 'CSS', value: 'css' },
                { label: 'JSON', value: 'json' },
                { label: 'Bash', value: 'bash' },
                { label: 'SQL', value: 'sql' },
                { label: 'PHP', value: 'php' },
                { label: 'Java', value: 'java' },
                { label: 'C++', value: 'cpp' },
                { label: 'Go', value: 'go' },
                { label: 'Rust', value: 'rust' },
                { label: 'Swift', value: 'swift' },
                { label: 'Kotlin', value: 'kotlin' },
                { label: 'Dart', value: 'dart' },
                { label: 'Plain Text', value: 'text' },
              ],
            },
            {
              name: 'code',
              label: 'Code',
              type: 'textarea',
              required: true,
            },
            {
              name: 'filename',
              label: 'Filename (optional)',
              type: 'text',
            },
          ],
        },
        {
          slug: 'callout',
          labels: {
            singular: 'Callout',
            plural: 'Callouts',
          },
          fields: [
            {
              name: 'type',
              label: 'Callout Type',
              type: 'select',
              defaultValue: 'info',
              options: [
                { label: 'Info', value: 'info' },
                { label: 'Warning', value: 'warning' },
                { label: 'Error', value: 'error' },
                { label: 'Success', value: 'success' },
                { label: 'Note', value: 'note' },
              ],
            },
            {
              name: 'title',
              label: 'Title',
              type: 'text',
            },
            {
              name: 'content',
              label: 'Content',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ defaultFeatures }) => [
                  ...defaultFeatures,
                  BoldFeature(),
                  ItalicFeature(),
                  LinkFeature({
                    enabledCollections: ['pages', 'posts'],
                  }),
                ],
              }),
            },
          ],
        },
        {
          slug: 'mediaBlock',
          labels: {
            singular: 'Media Block',
            plural: 'Media Blocks',
          },
          fields: [
            {
              name: 'media',
              label: 'Media',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'caption',
              label: 'Caption',
              type: 'text',
            },
            {
              name: 'position',
              label: 'Position',
              type: 'select',
              defaultValue: 'default',
              options: [
                { label: 'Default', value: 'default' },
                { label: 'Full Width', value: 'fullwidth' },
                { label: 'Wide', value: 'wide' },
              ],
            },
          ],
        },
        {
          slug: 'banner',
          labels: {
            singular: 'Banner',
            plural: 'Banners',
          },
          fields: [
            {
              name: 'style',
              label: 'Banner Style',
              type: 'select',
              defaultValue: 'info',
              options: [
                { label: 'Info', value: 'info' },
                { label: 'Warning', value: 'warning' },
                { label: 'Error', value: 'error' },
                { label: 'Success', value: 'success' },
              ],
            },
            {
              name: 'content',
              label: 'Banner Content',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ defaultFeatures }) => [
                  ...defaultFeatures,
                  BoldFeature(),
                  ItalicFeature(),
                  LinkFeature({
                    enabledCollections: ['pages', 'posts'],
                  }),
                ],
              }),
            },
          ],
        },
      ],
    }),
  ],
})

// Export the excerpt regeneration hook for use in collections
export { regenerateExcerpt }

// Export the features function for reuse
export { rootLexicalFeatures }

// Default export for the lexical editor
export { rootLexical }
export default rootLexical
