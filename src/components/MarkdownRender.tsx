import React, { useState, useEffect, useRef } from 'react'
import Markdown, { Components } from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Check, ClipboardCopy } from 'lucide-react'

const PreRenderer: React.FC<any> = ({ children }) => {
  return <pre className="p-0 m-0 bg-transparent relative">{children}</pre>
}

const CodeRenderer: React.FC<any> = ({ node, inline, className, children, ...props }) => {
  const [copied, setCopied] = useState(false)
  const match = /language-(\w+)/.exec(className || '')
  const language = match ? match[1] : 'plaintext'

  const copyCode = () => {
    navigator.clipboard.writeText(String(children))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!inline && match) {
    return (
      <div className="overflow-visible">
        <div className="bg-background rounded-md border border-border relative">
          <div className="flex items-center justify-between text-muted-foreground bg-secondary px-4 py-2 text-xs font-mono rounded-t-md">
            <span>{language}</span>
            <button
              onClick={copyCode}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-accent-foreground transition-colors"
              aria-label={copied ? 'Copied' : 'Copy code'}
            >
              {copied ? (
                <>
                  <Check size={14} />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <ClipboardCopy size={14} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <div className="p-4 overflow-auto">
            <SyntaxHighlighter
              language={language}
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                padding: 0,
                background: 'transparent',
              }}
              codeTagProps={{
                style: {
                  fontSize: '0.875rem',
                  fontFamily: 'var(--font-jetbrains-mono), monospace',
                },
              }}
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    )
  }

  return (
    <code className="bg-secondary text-secondary-foreground px-1 py-0.5 rounded" {...props}>
      {children}
    </code>
  )
}

const MarkdownRenderer: React.FC<any> = ({ content }) => (
  <Markdown
    components={{
      code: CodeRenderer as Components['code'],
      pre: PreRenderer as Components['pre'],
    }}
    className="prose prose-invert max-w-none"
  >
    {content}
  </Markdown>
)

export default MarkdownRenderer