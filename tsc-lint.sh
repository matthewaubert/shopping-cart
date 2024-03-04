#!/bin/bash

TMP=.tsconfig-lint.json
cat >$TMP <<EOF
{
  "extends": "./tsconfig.json",
  "include": [
EOF
for file in "${@: 1: $#-1}"; do
  echo -e "    \"${file}\"," >> $TMP
done
echo -e "    \"${@: -1}\"" >> $TMP
cat >>$TMP <<EOF
  ]
}
EOF
tsc --watch --project $TMP