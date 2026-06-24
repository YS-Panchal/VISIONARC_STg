with open('scratch/formatted_footer.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()

filtered = []
for line in lines:
    if '<path' in line or 'd="' in line or 'M19.' in line or '<svg' in line or '</svg>' in line or '</path>' in line:
        continue
    filtered.append(line)

with open('scratch/clean_footer.txt', 'w', encoding='utf-8') as out:
    out.writelines(filtered)

print("Cleaned footer written to scratch/clean_footer.txt")
