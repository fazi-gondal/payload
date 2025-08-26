// src/fields/rootEditor.ts
import { lexicalEditor } from '@payloadcms/richtext-lexical';

export const rootEditor = lexicalEditor({
  features: ({ defaultFeatures }) => [
    ...defaultFeatures,
    // heading 1–6
    { feature: 'heading', options: { enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] } },
    // inline code
    { feature: 'inlineCode' },
    // fenced code blocks
    { feature: 'codeBlock' },
    // text & background colours
    { feature: 'textColor' },
    { feature: 'backgroundColor' },
    // sub / sup
    { feature: 'subscript' },
    { feature: 'superscript' },
    // uploads
    {
      feature: 'upload',
      options: {
        collections: {
          media: {
            fields: [{ name: 'caption', type: 'text' }],
          },
        },
      },
    },
    // links
    {
      feature: 'link',
      options: {
        enabledCollections: ['posts', 'pages'],
        fields: [{ name: 'rel', type: 'select', options: ['nofollow', 'noopener'] }],
      },
    },
  ],
});
