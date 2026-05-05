import os

settings_path = '/home/project/xrwvm-fullstack_developer_capstone/server/djangoproj/settings.py'
with open(settings_path, 'r') as f:
    content = f.read()

if "import os" not in content:
    content = "import os\n" + content

if "frontend/build" not in content:
    content = content.replace("'DIRS': [],", "'DIRS': [os.path.join(BASE_DIR, 'frontend/build')],")
    content = content.replace("'DIRS': []", "'DIRS': [os.path.join(BASE_DIR, 'frontend/build')]")

if "STATICFILES_DIRS" not in content:
    content += "\nSTATICFILES_DIRS = [os.path.join(BASE_DIR, 'frontend/build/static')]\n"

with open(settings_path, 'w') as f:
    f.write(content)
