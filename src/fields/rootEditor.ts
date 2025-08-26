// src/fields/rootEditor.ts
import { lexicalEditor } from '@payloadcms/richtext-lexical';

export const rootEditor = lexicalEditor({
  features: ({ rootFeatures }) => rootFeatures,
});
