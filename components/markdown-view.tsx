const inlineCode = (text: string) => {
  const parts = text.split(/(`[^`]+`)/g);

  return parts.map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={`${part}-${index}`}>{part.slice(1, -1)}</code>;
    }

    return part;
  });
};

export function MarkdownView({ body }: { body: string }) {
  const lines = body.split("\n");
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];
  let orderedListItems: string[] = [];
  let codeLines: string[] = [];
  let inCode = false;

  const flushList = () => {
    if (listItems.length === 0) {
      return;
    }

    elements.push(
      <ul key={`list-${elements.length}`}>
        {listItems.map((item, index) => (
          <li key={`${item}-${index}`}>{inlineCode(item)}</li>
        ))}
      </ul>,
    );
    listItems = [];
  };

  const flushOrderedList = () => {
    if (orderedListItems.length === 0) {
      return;
    }

    elements.push(
      <ol key={`ordered-list-${elements.length}`}>
        {orderedListItems.map((item, index) => (
          <li key={`${item}-${index}`}>{inlineCode(item)}</li>
        ))}
      </ol>,
    );
    orderedListItems = [];
  };

  const flushLists = () => {
    flushList();
    flushOrderedList();
  };

  const flushCode = () => {
    if (codeLines.length === 0) {
      return;
    }

    elements.push(
      <pre key={`code-${elements.length}`}>
        <code>{codeLines.join("\n")}</code>
      </pre>,
    );
    codeLines = [];
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trimEnd();

    if (line.startsWith("```")) {
      if (inCode) {
        inCode = false;
        flushCode();
      } else {
        flushLists();
        inCode = true;
      }
      return;
    }

    if (inCode) {
      codeLines.push(rawLine);
      return;
    }

    if (!line.trim()) {
      flushLists();
      return;
    }

    if (line.startsWith("- ")) {
      flushOrderedList();
      listItems.push(line.replace(/^-\s+/, ""));
      return;
    }

    const orderedMatch = line.match(/^\d+\.\s+(.+)$/);
    if (orderedMatch) {
      flushList();
      orderedListItems.push(orderedMatch[1]);
      return;
    }

    flushLists();

    if (line.startsWith("### ")) {
      elements.push(<h3 key={`h3-${elements.length}`}>{inlineCode(line.replace(/^###\s+/, ""))}</h3>);
      return;
    }

    if (line.startsWith("## ")) {
      elements.push(<h2 key={`h2-${elements.length}`}>{inlineCode(line.replace(/^##\s+/, ""))}</h2>);
      return;
    }

    if (line.startsWith("# ")) {
      elements.push(<h1 key={`h1-${elements.length}`}>{inlineCode(line.replace(/^#\s+/, ""))}</h1>);
      return;
    }

    if (line.startsWith("> ")) {
      elements.push(<blockquote key={`quote-${elements.length}`}>{inlineCode(line.replace(/^>\s+/, ""))}</blockquote>);
      return;
    }

    elements.push(<p key={`p-${elements.length}`}>{inlineCode(line)}</p>);
  });

  flushList();
  flushOrderedList();
  flushCode();

  return <div className="markdown">{elements}</div>;
}
