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
