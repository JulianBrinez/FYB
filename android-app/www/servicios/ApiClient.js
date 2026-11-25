/* Cliente API de FYB para web y Android */
(function (App) {
  "use strict";

  class ErrorApi extends Error {
    constructor(mensaje, estado) {
      super(mensaje);
      this.name = "ErrorApi";
      this.estado = estado;
    }
  }

  const esAndroid = !!(
    window.Capacitor &&
    window.Capacitor.getPlatform() === "android"
  );

  const API_BASE = esAndroid ? "http://192.168.1.103:8080" : "";

  class ApiClient {
    static async solicitar(metodo, ruta, cuerpo) {
      const url = ruta.startsWith("http") ? ruta : API_BASE + ruta;
      let respuesta;

      try {
        console.log("[FYB] Solicitud:", metodo, url);

        respuesta = await fetch(url, {
          method: metodo,
          credentials: "include",
          headers: cuerpo === undefined ? {} : {
            "Content-Type": "application/json"
          },
          body: cuerpo === undefined ? undefined : JSON.stringify(cuerpo)
        });
      } catch (e) {
        console.error("[FYB] Error de conexión:", e);
        throw new ErrorApi("No se pudo conectar con el servidor.", 0);
      }

      let datos = null;

      try {
        datos = await respuesta.json();
      } catch (e) {
        console.error("[FYB] Respuesta JSON inválida:", e);
      }

      console.log("[FYB] Respuesta:", respuesta.status, datos);

      return { estado: respuesta.status, datos };
    }

    static mensajeDe(respuesta) {
      return (respuesta.datos && respuesta.datos.mensaje) ||
        "Ocurrió un error inesperado. Inténtalo de nuevo.";
    }
  }

  App.front.api.ErrorApi = ErrorApi;
  App.front.api.ApiClient = ApiClient;
})(window.App);
