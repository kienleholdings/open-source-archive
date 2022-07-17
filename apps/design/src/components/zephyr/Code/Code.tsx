import type { HTMLProps } from 'react';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import type { SyntaxHighlighterProps } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
// TODO: We should eventually build our own style for this and move it into zephyr-code or something
// @ts-expect-error: For whatever reason react-syntax-highlighter doesn't export this module from their typed files
import oneDark from 'react-syntax-highlighter/dist/cjs/styles/prism/one-dark';

SyntaxHighlighter.registerLanguage('tsx', tsx);

export interface CodeProps extends Omit<HTMLProps<HTMLDivElement>, 'children'> {
  children: SyntaxHighlighterProps['children'];
  language?: SyntaxHighlighterProps['language'];
}

function Code({ children, language = 'tsx', ...props }: CodeProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div className="mb-16" {...props}>
      <SyntaxHighlighter language={language} customStyle={{ margin: 0 }} style={oneDark}>
        {children}
      </SyntaxHighlighter>
    </div>
  );
}

export default Code;
