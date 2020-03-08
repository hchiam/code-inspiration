entries=()

for entry in "build/static/css"/*
do
  # ignore maps and other files
  if [[ $entry =~ .*\.chunk\.css$ ]]
  then
    # remove "build" from start of path string
    entries+=("  '${entry/build/}',")
  fi
done
# echo $entries

for entry in "build/static/js"/*
do
  # ignore maps and other files
  if [[ $entry =~ .*\.chunk\.js$ ]]
  then
    # remove "build" from start of path string
    entries+=("  '${entry/build/}',")
  fi
done
# echo $entries

# empty temp file:
touch temp.service-worker.js
> temp.service-worker.js

# fill file:
printf "%s\n" "${entries[@]}" > temp.entries.txt

awk '/  \/\/ START OF AUTOMATICALLY-ENTERED LINES:/ { t=1; print; printf("\n"); system("cat temp.entries.txt"); printf("\n"); } 
     /  \/\/ END OF AUTOMATICALLY-ENTERED LINES/   { t=0 } 
     t==0 { print } ' public/my-service-worker.js > temp.service-worker.js

# replace with temp contents:
mv temp.service-worker.js public/my-service-worker.js

# cleanup:
rm temp.entries.txt
