import re

with open('reference/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

matches = [m.start() for m in re.finditer(r'(cursor|mouse|dot|follow|pointer)', html, re.IGNORECASE)]
print(f"Found {len(matches)} occurrences.")

for m in matches[:15]:
    start = max(0, m - 100)
    end = min(len(html), m + 200)
    print(f"Match at index {m}:\n{html[start:end]}\n---")
