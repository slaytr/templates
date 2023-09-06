Example CURL request to graphql

```
curl --request POST \
    --header 'content-type: application/json' \
    --url http://localhost:4000/ \
    --data '{"query":"query{books{title author}cars{name}}"}'
```