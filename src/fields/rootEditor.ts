// src/fields/rootEditor.ts
import { lexicalEditor } from '@payloadcms/richtext-lexical';
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
  TextColorFeature,
  BackgroundColorFeature,
  InlineCodeFeature,     // <-- inline `code`
  CodeBlockFeature,      // <-- fenced ```code blocks
} from '@payloadcms/richtext-lexical';

export const rootEditor = lexicalEditor({
  features: () => [
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
    TextColorFeature(),
    BackgroundColorFeature(),
    InlineCodeFeature(), // inline <code>
    CodeBlockFeature({    // ```code blocks
      // optional: limit selectable languages
      supportedLanguages: {
        js: 'JavaScript',
        ts: 'TypeScript',
        html: 'HTML',
        css: 'CSS',
        bash: 'Bash',
        json: 'JSON',
      },
    }),
  ],
});
