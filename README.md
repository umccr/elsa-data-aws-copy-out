# Elsa Data AWS Copy Out

A service that can be installed into an Elsa Data environment
and which enables parallel file copying out into a
destination bucket in the same region.

## Input

```json
{
  "sourceFilesCsvBucket": "bucket-with-csv",
  "sourceFilesCsvKey": "key-of-source-files.csv",
  "destinationBucket": "a-target-bucket-in-same-region",
  "maxItemsPerBatch": 10
}
```
