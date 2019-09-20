## Integrate [Mati KYC service](https://getmati.com/) to your website with Mati web button

How it looks like in your code:

```
<mati-button clientid="<YOUR_CLIENT_ID>" metadata="<JSON_METADATA_STRING>" />
```

How it looks like on your page:

<img src="https://gist.githubusercontent.com/rastyagaev/f4536bb44c4812c8079c035f62167eed/raw/5fabbb375d78e574f058306992177f22b396a9db/web-button-preview.png" width="211" />


### Integrate

Add this script to your `<script>` tag 

```
<script src="http://web-button.mati.io/button.js"></script>
```

Get your client ID from Mati Dashboard and put this code snippet anywhere in your page

```
<mati-button clientid="<YOUR_CLIENT_ID>" />
```

### API

#### Button attributes

| Attribute name | Description                                                                                     |
|----------------|-------------------------------------------------------------------------------------------------|
| `clientid`     | Your client id from [Mati Dashboard](http://dashboard.getmati.com/)                             |
| `metadata`     | JSON string for varification metadata. Use it to pass user ids or any other related information |

### Examples

* Angular: https://codesandbox.io/s/angular-3z773
* React: https://codesandbox.io/s/infallible-bash-7p0oq
