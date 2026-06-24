import re

with open('reference/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

matches = [m.start() for m in re.finditer(r'(about-card-images|cta-image|card-image-left|about-card-image)', html, re.IGNORECASE)]
print(f"Found {len(matches)} occurrences.")

for m in matches:
    start = max(0, m - 150)
    end = min(len(html), m + 350)
    print(f"Match at index {m}:\n{html[start:end]}\n---")
