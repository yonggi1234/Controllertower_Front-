# Controllertower_Front
---

### 초기 구성
* 프로젝트 환경 설정
```
yarn eject

yarn add sass-loader node-sass classnames

yarn add open-color
```

* webpack 설정 파일 수정

```
# config/webpack.config.dev.js 파일에서
loader: require.resolve('css-loader'),
  options: cssOptions,

#부분을 다음과 같이 수정
loader: require.resolve('css-loader'),
  options: {
    cssOptions,
    modules: true,
    localIdentName: '[path][name]__[local]--[hash:base64:5]'
}
```
* config/paths.js 파일에서 styles 디렉터리 정의
```
module.exports = {
(...),
styles: resolveApp('src/style')
};

```
