 // src/fields/rootEditor.ts
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import {
  AlignFeature,
  BlockquoteFeature,
  BoldFeature,
  CodeBlockFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  IndentFeature,
  InlineCodeFeature,
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
} from '@payloadcms/richtext-lexical';

export const rootEditor = lexicalEditor({
  features: () => [
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    StrikethroughFeature(),
    SubscriptFeature(),
    SuperscriptFeature(),
    HeadingFeature({
      enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    }),
    InlineCodeFeature(),
    CodeBlockFeature({
      supportedLanguages: {
        js: 'JavaScript',
        ts: 'TypeScript',
        html: 'HTML',
        css: 'CSS',
        bash: 'Bash',
        json: 'JSON',
      },
    }),
    LinkFeature({
      enabledCollections: ['posts', 'pages'],
      fields: [
        {
          name: 'rel',
          type: 'select',
          options: ['nofollow', 'noopener'],
        },
      ],
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
          '#000000',
          '#ffffff',
          '#ff0000',
          '#ffff00',
          '#00ff00',
          '#0000ff',
          '#ff00ff',
          '#00ffff',
        ],
      },
    }),
  ],
});
