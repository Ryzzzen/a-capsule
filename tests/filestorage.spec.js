describe("File Storage", function() {
  const { FileStorage } = require('..');
  let Storage = new FileStorage('test.json');

  it("loads", async function() {
    await Storage.load();
  });

  it("sets default values", function() {
    Storage.default()
    .add('hello', 'world')
    .add('yo', true)
    .end();

    expect(Storage.get("hello")).toBe('world');
    expect(Storage.get("yo")).toBe(true);
  });

  it("saves", async function() {
    await Storage.save();
  });

  it("gets deleted", function(done) {
    require('fs').unlink('test.json', function(err) {
      if (err) { throw err; }
      done();
    });
  });
});
