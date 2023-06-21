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
