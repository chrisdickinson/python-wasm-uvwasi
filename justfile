prepare:
  #!/bin/bash
  if [ ! -e ./usr/local/lib/python311.zip ]; then
    curl -sL https://github.com/vmware-labs/webassembly-language-runtimes/releases/download/python%2F3.11.4%2B20230714-11be424/python-3.11.4-wasi-sdk-20.0.tar.gz | tar zxfv -
  fi

run: prepare
  node index.js
