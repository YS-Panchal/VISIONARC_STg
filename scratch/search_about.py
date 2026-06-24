with open('scratch/formatted_footer.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for idx in range(220, len(lines)):
    print(f"{idx}: {lines[idx].strip()}")
