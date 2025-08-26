// src/fields/rootEditor.ts
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import type { LexicalEditorProps } from '@payloadcms/richtext-lexical';

// This single line enables **all** lexical features
export const rootEditor = lexicalEditor({
  features: ({ rootFeatures }) => rootFeatures,
}) as LexicalEditorProps;
