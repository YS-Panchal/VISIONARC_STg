import re

with open('reference/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Let's search for script tags and inspect their content for "mouse" or ".mouse" or "x:" or "y:"
scripts = re.findall(r'<script>(.*?)</script>', html, re.DOTALL)
print(f"Found {len(scripts)} scripts.")
for i, script in enumerate(scripts):
    if 'mouse' in script or 'mousemove' in script or 'cursor' in script or '.mouse' in script:
        print(f"Script {i} contains keywords:")
        print(script[:1000])
        print("---")
