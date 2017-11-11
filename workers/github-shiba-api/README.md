# Shiba-API

GitHub contributions heatmap JSON API on serverless.

## Installation

```
npm install
sls deploy
```

## API

/users/:id

On success

```
{
  "statusCode": 200,
  "body": {
    "id": "potato4d",
    "message": "success.",
    "contributions": {
      "yesterday": "7",
      "today": "10"
    }
  }
}
```

On error

```
{
  "statusCode": 500,
  "body": {
    "id": "potato4d",
    "message": "fail."
  }
}
```

## Demo

https://6yenm5uxq6.execute-api.ap-northeast-1.amazonaws.com/dev/users/potato4d
