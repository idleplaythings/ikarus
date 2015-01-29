
# Prereqs

    npm install

# Getting ARMA 3 item image urls

    node bi-wiki-item-image-urls.js > urls

# Getting images

    mkdir items
    cd items
    wget -i ../urls

# Generating json

    cat urls | node image-urls-to-json.js > items.json
