describe("Utilisation des comparateurs", () => {
  describe("Comparateurs courants", () => {
    test("Adds 1 +2 to equal 3", () => {
      expect(1 + 2).toBe(3);
    });

    test("object assignment", () => {
      const data = { one: 1, two: 2 };
      expect(data).toEqual({ one: 1, two: 2 });
    });

    test("l'addition de nombres positifs n'est pas égale à zéro", () => {
      for (let a = 1; a < 10; a++) {
        for (let b = 1; b < 10; b++) {
          expect(a + b).not.toBe(0);
        }
      }
    });
  });

  describe("Valeur de vérité", () => {
    test("null", () => {
      const n = null;
      expect(n).toBeNull();
      expect(n).toBeDefined();
      expect(n).not.toBeUndefined();
      expect(n).not.toBeTruthy();
      expect(n).toBeFalsy();
    });

    test("zero", () => {
      const z = 0;
      expect(z).not.toBeNull();
      expect(z).toBeDefined();
      expect(z).not.toBeUndefined();
      expect(z).not.toBeTruthy();
      expect(z).toBeFalsy();
    });
  });

  describe("Nombre", () => {
    test("deux plus deux", () => {
      const value = 2 + 2;
      expect(value).toBeGreaterThan(3);
      expect(value).toBeGreaterThanOrEqual(3.5);
      expect(value).toBeLessThan(5);
      expect(value).toBeLessThanOrEqual(4.5);

      // toBe et toEqual sont équivalents pour les nombres
      expect(value).toBe(4);
      expect(value).toEqual(4);
    });

    test("ajout de nombres à virgule flottantes", () => {
      const value = 0.1 + 0.2;
      //expect(value).toBe(0.3);           Cela ne fonctionnera pas en raison d'une erreur d'arrondi
      expect(value).toBeCloseTo(0.3); // Cela fonctionne.
    });
  });

  describe("Chaines de caractères (Strings)", () => {
    test("il n'y a pas de I dans team", () => {
      expect("team").not.toMatch(/I/);
    });

    test('mais il y a "stop" dans Christoph', () => {
      expect("Christoph").toMatch(/stop/);
    });
  });

  describe("Tableaux et itérables", () => {
    const shoppingList = [
      "diapers",
      "kleenex",
      "trash bags",
      "paper towels",
      "milk",
    ];

    test("la liste de course possède du lait", () => {
      expect(shoppingList).toContain("milk");
      expect(new Set(shoppingList)).toContain("milk");
    });
  });

  describe("Exceptions", () => {
    function compileAndroidCode() {
      throw new Error("you are using the wrong JDK!");
    }

    test("compiling android goes as expected", () => {
      expect(() => compileAndroidCode()).toThrow();
      expect(() => compileAndroidCode()).toThrow(Error);

      // You can also use a string that must be contained in the error message or a regexp
      expect(() => compileAndroidCode()).toThrow("you are using the wrong JDK");
      expect(() => compileAndroidCode()).toThrow(/JDK/);

      // Or you can match an exact error message using a regexp like below
      //   expect(() => compileAndroidCode()).toThrow(
      //     /^you are using the wrong JDK$/
      //   ); // Test fails
      expect(() => compileAndroidCode()).toThrow(
        /^you are using the wrong JDK!$/
      ); // Test pass
    });
  });
});

describe("Tester du code asynchrone", () => {
  describe("Promesses", () => {
    test("la donnée est peanut butter", () => {
      return fetch("https://jsonplaceholder.typicode.com/posts/1").then(
        (data) => {
          expect(data).toBeDefined();
        }
      );
    });
  });
  describe("Async/Await", () => {
    test("la donnée est peanut butter", async () => {
      const data = await fetch("https://jsonplaceholder.typicode.com/posts/1");
      expect(data).toBeDefined();
    });
    test("la récupération échoue avec une erreur", async () => {
      expect.assertions(1);
      //   expect.assertions(1) est une méthode fournie par Jest pour spécifier le nombre d'assertions attendues dans un test. Elle est utilisée pour s'assurer qu'au moins une assertion est effectuée pendant l'exécution d'un test.
      try {
        await fetch();
        // Le test échoue si la promesse n'est pas rejetée
        expect(true).toBe(false);
      } catch (e) {
        // Le test réussit si la promesse est rejetée
        expect(e).toBeDefined();
      }
    });
  });

  describe("Fonctions de rappel (Callbacks)", () => {
    function fetchData(callback) {
      setTimeout(() => {
        const data = "Hello, Jest!";
        callback(data);
      }, 1000);
    }

    test("Async function with callback without mockCallback", (done) => {
      expect.assertions(1);

      fetchData((data) => {
        expect(data).toBe("Hello, Jest!");
        done();
        // si on enleve done() et on met :
        // expect(data).toBe("Hello!"); tous les test vont passer
        // et on va pas tester ce test. (Teste pour que tu comprend)
      });
    });
  });
});

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

    const myMock2 = jest.fn();
    const b = {};
    const bound = myMock2.bind(b);
    bound();
  });
});
