describe("Mock Function Function simulee", () => {
  describe("Utilisation d'une fonction simple", () => {
    const forEach = (items, callback) => {
      for (let index = 0; index < items.length; index++) {
        callback(items[index]);
      }
    };
    const mockCallback = jest.fn((x) => 42 + x);
    test("forEach mock function", () => {
      forEach([0, 1], mockCallback);

      // The mock function was called twice
      expect(mockCallback.mock.calls).toHaveLength(2);

      // The first argument of the first call to the function was 0
      expect(mockCallback.mock.calls[0][0]).toBe(0);

      // The first argument of the second call to the function was 1
      expect(mockCallback.mock.calls[1][0]).toBe(1);

      // The return value of the first call to the function was 42
      expect(mockCallback.mock.results[0].value).toBe(42);
    });
  });

  describe("Propriété .mock", () => {
    const myMock1 = jest.fn();
    const a = new myMock1();
    a.name = "a";
    console.log("a", a);
    const b = {};
    b.name = "b";
    const bound = myMock1.bind(b);
    bound();
    console.log("bound", bound());
    console.log("Instance Mock", myMock1.mock.instances);

    test("Some mock function", () => {
      const someMockFunction = jest.fn(() => "return value");

      someMockFunction("first arg", "second arg");

      // The function was called exactly once
      expect(someMockFunction.mock.calls).toHaveLength(1);

      // The first arg of the first call to the function was 'first arg'
      expect(someMockFunction.mock.calls[0][0]).toBe("first arg");

      // The second arg of the first call to the function was 'second arg'
      expect(someMockFunction.mock.calls[0][1]).toBe("second arg");

      // The return value of the first call to the function was 'return value'
      expect(someMockFunction.mock.results[0].value).toBe("return value");

      // The function was called with a certain `this` context: the `element` object.
      //   expect(someMockFunction.mock.contexts[0]).toBe(element);

      const someMockConstructor = jest.fn();
      const a = new someMockConstructor();
      const b = new someMockConstructor("test");
      a.name = "test";
      // This function was instantiated exactly twice
      expect(someMockConstructor.mock.instances.length).toBe(2);

      // The object returned by the first instantiation of this function
      // had a `name` property whose value was set to 'test'
      expect(someMockConstructor.mock.instances[0].name).toBe("test");

      // The first argument of the last call to the function was 'test'
      console.log("Test", someMockConstructor.mock.lastCall[0]);
      expect(someMockConstructor.mock.lastCall[0]).toBe("test");
    });
  });

  describe("Valeurs de retour simulées", () => {
    const myMock = jest.fn();
    console.log(myMock());
    // > undefined

    myMock
      .mockReturnValueOnce(10)
      .mockReturnValueOnce("x")
      .mockReturnValue("x");

    console.log(myMock(), myMock(), myMock(), myMock());
    // > 10, 'x', true, true
    test("filterTest", () => {
      const filterTestFn = jest.fn();

      // Faire en sorte que la simulation renvoie `true` pour le premier appel,
      // et `false` pour le second appel
      filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);

      const result = [11, 12].filter((num) => filterTestFn(num));
      // > [11]
      console.log(filterTestFn.mock.calls[0][0]); // 11
      console.log(filterTestFn.mock.calls[1][0]); // 12
    });
  });

  describe("Modules de simulation Moking Modules", () => {
    const axios = require("axios");
    const Users = require("../src/users");

    jest.mock("axios");

    test("doit récupérer les utilisateurs", () => {
      const users = [{ name: "Bob" }];
      const resp = { data: users };
      // axios.get.mockResolvedValue(resp);

      // ou vous pouvez utiliser ce qui suit en fonction de votre cas d'utilisation :
      axios.get.mockImplementation(() => Promise.resolve(resp));

      return Users.all().then((data) => expect(data).toEqual(users));
    });
  });

  describe("Mock partielle", () => {
    const { bar, foo } = require("../src/foo-bar-baz");
    const defaultExport = require("../src/foo-bar-baz").default;

    jest.mock("../src/foo-bar-baz", () => {
      const originalModule = jest.requireActual("../src/foo-bar-baz");

      //Simule l'exportation par défaut et l'exportation nommée 'foo'
      return {
        __esModule: true,
        ...originalModule,
        default: jest.fn(() => "mocked baz"),
        foo: "mocked foo",
      };
    });
    test("devrait faire une simulation partielle", () => {
      const defaultExportResult = defaultExport();
      expect(defaultExportResult).toBe("mocked baz");
      expect(defaultExport).toHaveBeenCalled();

      expect(foo).toBe("mocked foo");
      expect(bar()).toBe("bar");
    });
  });

  describe("Mock Implementations (Implémentations simulées)", () => {
    jest.mock("../src/foo");
    const foo = require("../src/foo");

    // foo est une fonction simulée
    foo.mockImplementation(() => 42);
    foo();
    // > 42

    // Lorsque vous devez recréer un comportement complexe d'une fonction simulée, de sorte que plusieurs appels de fonction produisent des résultats différents, utilisez la méthode mockImplementationOnce :
    const myMockFn = jest
      .fn()
      .mockImplementationOnce((cb) => cb(null, true))
      .mockImplementationOnce((cb) => cb(null, false));

    myMockFn((err, val) => console.log(val));
    // > true

    myMockFn((err, val) => console.log(val));
    // > false
    // Lorsque la fonction simulée manque d'implémentations définies avec mockImplementationOnce, elle exécutera l'implémentation par défaut définie avec jest.fn (si elle est définie) :
    const myMockFn2 = jest
      .fn(() => "par défaut")
      .mockImplementationOnce(() => "premier appel")
      .mockImplementationOnce(() => "second appel");

    console.log(myMockFn2(), myMockFn2(), myMockFn2(), myMockFn2());
    // > 'premier appel', 'second appel', 'par défaut', 'par défaut'

    // Pour les cas où nous avons des méthodes qui sont typiquement enchaînées (et donc doivent toujours retourner this), nous avons une API sucrée pour simplifier cela sous la forme d'une fonction .mockReturnThis() qui se trouve également sur tous les simulations :
    const myObj = {
      myMethod: jest.fn().mockReturnThis(),
    };

    // est identique à

    const otherObj = {
      myMethod: jest.fn(function () {
        return this;
      }),
    };
  });
});
