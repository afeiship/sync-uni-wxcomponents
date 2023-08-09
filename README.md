# sync-uni-wxcomponents
> Sync uniapp node_modules for mp-weixin components.

## installation
```shell
# public
yarn add --dev @jswork/sync-uni-wxcomponents
```

## configrc
```json
{
  "app": {
    "page": "src/pages.json",
    "wxcomponents": "src/wxcomponents"
  },
  "packages": [
    {
      "name": "mind-ui-weapp",
      "dist": "miniprogram_dist"
    }
  ]
}
```
