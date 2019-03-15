
# storage-pod

#### Changelog

> - 3.0.0 is out
> - SAMSS (Simple And Modular Storage System) is now storage-pod!

storage-pod is easy to use:

  - Lightweight
  - Contains 3 storage types: Storage, FileStorage and EncryptedStorage.
  - Based on promises and async/await, but also contains synchronous methods.

### Installation

storage-pod requires zero dependencies.

Install storage-pod using npm.

```sh
$ npm i storage-pod
```

## How to use

Using the Base (Memory) Storage
```js
let Storage = require('storage-pod').getStorage();
Storage.set('hello', 'world');
```
Using the File Storage
```js
const { FileStorage } = require('storage-pod');
let Storage = new FileStorage('file.json');

Storage.load().then(() => {
  await Storage.default()
  .add('hello', 'world')
  .add('this', ['is', 'a', 'default', 'value'])
  .end();

	await Storage.save();
}
```

Using the Encrypted Storage
```js
const { EncryptedStorage } = require('storage-pod');
let Storage = new EncryptedStorage('encrypted_file.random.ext', 'THIS_IS_THE_PASSWORD', 'aes256');

await Storage.load();

await Storage.default()
.add('hello', 'world')
.add('this', ['is', 'a', 'default', 'value'])
.end();

await Storage.save();
```
> - Storage#default()#end() tries to save the storage.
>
> - If the file doesn't exist, it gives an empty object, instead of an ENOENT error.

### License

This project is licensed under the MIT License. You can check [here](https://www.opensource.org/licenses/mit-license.php) for more details.
