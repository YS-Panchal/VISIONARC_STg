from html.parser import HTMLParser

class SimpleHTMLPrettyPrinter(HTMLParser):
    def __init__(self):
        super().__init__()
        self.indent_level = 0
        self.output = []

    def print_indent(self):
        return "  " * self.indent_level

    def handle_starttag(self, tag, attrs):
        attrs_str = " ".join([f'{k}="{v}"' for k, v in attrs])
        attrs_str = f" {attrs_str}" if attrs_str else ""
        self.output.append(f"{self.print_indent()}<{tag}{attrs_str}>")
        # Self-closing tags in HTML
        if tag not in ["img", "br", "input", "meta", "link", "hr", "circle", "rect", "path", "svg"]:
            self.indent_level += 1

    def handle_endtag(self, tag):
        if tag not in ["img", "br", "input", "meta", "link", "hr", "circle", "rect", "path", "svg"]:
            self.indent_level = max(0, self.indent_level - 1)
        self.output.append(f"{self.print_indent()}</{tag}>")

    def handle_data(self, data):
        cleaned = data.strip()
        if cleaned:
            self.output.append(f"{self.print_indent()}{cleaned}")

with open('reference/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Let's extract the part from <section class="section u-overflow-visible"> to the end of the sections or page
idx = html.find('footer_grid')
if idx != -1:
    section_start = html.rfind('<section', 0, idx)
    section_end = html.find('</section>', idx)
    if section_end != -1:
        section_end += len('</section>')
    else:
        section_end = idx + 10000
    footer_html = html[section_start:section_end]
    
    printer = SimpleHTMLPrettyPrinter()
    printer.feed(footer_html)
    
    with open('scratch/formatted_footer.txt', 'w', encoding='utf-8') as out:
        out.write("\n".join(printer.output))
    print("Formatted footer written to scratch/formatted_footer.txt")
else:
    print("footer_grid not found")
