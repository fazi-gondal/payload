// src/fields/rootEditor.ts
import { lexicalEditor } from '@payloadcms/richtext-lexical';

// NEW path for the *actual* features
import {
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  HeadingFeature,
  LinkFeature,
  UploadFeature,
  BlockquoteFeature,
  OrderedListFeature,
  UnorderedListFeature,
  IndentFeature,
  AlignFeature,
  HorizontalRuleFeature,
  InlineCodeFeature,
  CodeBlockFeature,
  TextColorFeature,
  BackgroundColorFeature,
} from '@payloadcms/richtext-lexical/features'; // <-- NOTE the /features path

export const rootEditor = lexicalEditor({
  features: [
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
    TextColorFeature(),
    BackgroundColorFeature(),
  ],
});
