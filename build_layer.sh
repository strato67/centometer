#!/bin/bash
printf "Please select folder:\n"
select d in */; do test -n "$d" && break; echo ">>> Invalid Selection"; done
cd "$d" && pwd

printf "Select folder for Python environment:\n"
select d in */; do test -n "$d" && break; echo ">>> Invalid Selection"; done

if [ -d "$d/lib" ]; then
    mkdir -p python
    cp -r "$d/lib" python/
    zip -r "deploy.zip" python
    echo "Folder created"
    rm -r python
else
    echo ">>> No 'lib' folder found. Exiting."
    exit 1
fi

