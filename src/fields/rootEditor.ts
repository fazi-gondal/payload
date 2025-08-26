// src/fields/rootEditor.ts
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import {
  AlignFeature,
  BlockquoteFeature,
  BoldFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  IndentFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  TextColorFeature,
  UnderlineFeature,
  UnorderedListFeature,
  UploadFeature,
  // ❌ DO NOT import CodeFeature or CodeBlockFeature here
} from '@payloadcms/richtext-lexical';

export const rootEditor = lexicalEditor({
  features: ({ defaultFeatures }) => [
    ...defaultFeatures, // this already contains inline-code & code-block
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    StrikethroughFeature(),
    SubscriptFeature(),
    SuperscriptFeature(),
    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
    LinkFeature({
      enabledCollections: ['posts', 'pages'],
      fields: [{ name: 'rel', type: 'select', options: ['nofollow', 'noopener'] }],
    }),
    UploadFeature({
      collections: {
        media: {
          fields: [{ name: 'caption', type: 'text' }],
        },
      },
    }),
    BlockquoteFeature(),
    OrderedListFeature(),
    UnorderedListFeature(),
    IndentFeature(),
    AlignFeature(),
    HorizontalRuleFeature(),
    TextColorFeature({
      colorPicker: {
        presets: [
          '#000000', '#ffffff', '#ff0000', '#ffff00', '#00ff00',
          '#0000ff', '#ff00ff', '#00ffff',
        ],
      },
    }),
  ],
});
