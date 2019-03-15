
# a-capsule

#### Changelog

> - 3.0.0 is out
> - SAMSS (Simple And Modular Storage System) is now a-capsule!

a-capsule is easy to use:

  - Lightweight
  - Contains 3 storage types: Storage, FileStorage and EncryptedStorage.
  - Based on promises and async/await, but also contains synchronous methods.

### Installation

a-capsule requires zero dependencies.

Install a-capsule using npm.

```sh
$ npm i a-capsule
```

## How to use

Using the Base (Memory) Storage
```js
let Storage = require('a-capsule').getStorage();
Storage.set('hello', 'world');
```
Using the File Storage
```js
const { FileStorage } = require('a-capsule');
let Storage = new FileStorage('file.json');

Storage.load().then(() => {
  await Storage.default()
  .add('hello', 'world')
  .add('this', ['is', 'a', 'default', 'value'])
  .end();

	// Storage#save is already called by Storage#default#end, no need to call it!
}
```

Using the Encrypted Storage
```js
const { EncryptedStorage } = require('a-capsule');
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
