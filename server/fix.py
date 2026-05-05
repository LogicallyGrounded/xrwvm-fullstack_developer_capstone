with open('djangoproj/settings.py', 'r') as f:
    c = f.read()
if 'import os' not in c:
    c = 'import os\n' + c
c = c.replace("'DIRS': []", "'DIRS': [os.path.join(BASE_DIR, 'frontend/build')]")
if 'STATICFILES_DIRS' not in c:
    c += "\nSTATICFILES_DIRS = [os.path.join(BASE_DIR, 'frontend/build/static')]\n"
with open('djangoproj/settings.py', 'w') as f:
    f.write(c)
