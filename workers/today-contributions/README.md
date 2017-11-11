# GitHubのContributionsをツイートするやつ

指定時刻にどれだけ圧倒的成長したかをかけるやつ  
GitHub自体の反映が遅いので、大体0時〜6時ぐらいに回すとtodayが機能になるので昨日のやつも吐ける

# いれかた

```
$ npm install
$ npm run build
```

# デプロイ

AWS LambdaとCloud Watchのスケジューリングつかって雑に
