$(document).ready(function () {
  // ===============================
  // Submenú de "Contacto" con jQuery (animación al hover)
  // ===============================
  $("#navbarDropdownContacto").removeAttr("data-bs-toggle"); // Eliminar el toggle de Bootstrap para evitar conflictos

  $(".nav-item.dropdown").hover(
    function () {
      const $menu = $(this).find(".dropdown-menu");
      if ($menu.length) {
        $menu.stop(true, true).slideDown(200); // Desplegar submenú con animación
        $(this).addClass("show");
        $menu.addClass("show");
      }
    },
    function () {
      const $menu = $(this).find(".dropdown-menu");
      if ($menu.length) {
        $menu.stop(true, true).slideUp(200, function () {
          // Ocultar submenú con animación
          $(this).removeClass("show");
          $(this).closest(".nav-item").removeClass("show");
        });
      }
    }
  );

  // ===============================
  // Hero Overlay: Animación al cargar
  // ===============================
  $("#hero-overlay").hide().fadeIn(2000); // Puedes usar .slideDown(1000) si prefieres

  // ===============================
  // Clases destacadas: animación al hover con jQuery
  // ===============================
  $(".clase-card").hover(
    function () {
      $(this).stop().animate({ top: "-10px" }, 200); // Sube al hacer hover
    },
    function () {
      $(this).stop().animate({ top: "0" }, 200); // Vuelve a su lugar
    }
  );

  // ===============================
  // Contador animado con jQuery al cargar
  // ===============================
  function animateCounter($element, target) {
    let current = 0;
    let increment = Math.max(1, target / 100); // Evita incrementos menores a 1
    let interval = setInterval(function () {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      $element.text(Math.floor(current));
    }, 20); // Velocidad de refresco
  }

  $(".counter").each(function () {
    const $this = $(this);
    const target = parseInt($this.attr("data-target"));
    animateCounter($this, target);
  });

  // ===============================
  // Testimonios: Carrusel autoplay + pausa en hover
  // ===============================
  $("#carouselTestimonios").carousel({
    interval: 4000, // Cambia cada 4 segundos
    pause: "hover", // Se detiene al pasar el mouse
  });

  // ===============================
  // Validación Bootstrap + Spinner
  // ===============================
  $("#formularioFooter").on("submit", function (e) {
    e.preventDefault();
    const form = this;

    if (!form.checkValidity()) {
      e.stopPropagation();
      $(form).addClass("was-validated");
      return;
    }

    // Mostrar spinner
    $("#spinnerFooter").removeClass("d-none");
    $("#btnTextFooter").text("Enviando...");

    setTimeout(() => {
      alert("Formulario enviado con éxito ✅");
      form.reset();
      $(form).removeClass("was-validated");
      $("#spinnerFooter").addClass("d-none");
      $("#btnTextFooter").text("Enviar");
    }, 1500);
  });

  // Filtro de clases con botones
  $("[data-filter]").on("click", function () {
    const filtro = $(this).data("filter");

    // Activar botón
    $("[data-filter]").removeClass("active").attr("aria-pressed", "false");
    $(this).addClass("active").attr("aria-pressed", "true");

    // Mostrar/ocultar tarjetas
    $(".clase-card").each(function () {
      const categoria = $(this).data("categoria");
      if (filtro === "todos" || filtro === categoria) {
        $(this).fadeIn();
      } else {
        $(this).fadeOut();
      }
    });
  });

  // Barras de habilidades animadas
$(".entrenadores-section .progress-bar").each(function () {
  const $this = $(this);
  const value = parseInt($this.data("value"));
  $this.css("width", value + "%").attr("aria-valuenow", value);
});

// Rating: cambiar estrellas al hacer clic
$(".entrenadores-section .rating input").on("change", function () {
  const name = $(this).attr("name");
  const value = $("input[name='" + name + "']:checked").next("label").attr("aria-label");
  console.log("Rating seleccionado:", value); // Opcional: mostrar valor
});

// Validación en tiempo real
$("#formContacto input, #formContacto select, #formContacto textarea").on("input change", function () {
  if (this.checkValidity()) {
    $(this).removeClass("is-invalid").addClass("is-valid");
  } else {
    $(this).removeClass("is-valid").addClass("is-invalid");
  }
});

// Enviar formulario
$("#formContacto").on("submit", function (e) {
  e.preventDefault();

  const form = this;
  if (!form.checkValidity()) {
    $(form).addClass("was-validated");
    return;
  }

  $("#spinnerContacto").removeClass("d-none");
  $("#btnText").text("Enviando...");

  setTimeout(() => {
    $("#spinnerContacto").addClass("d-none");
    $("#btnText").text("Enviar");
    $(form).removeClass("was-validated").find(".is-valid").removeClass("is-valid");
    form.reset();
    $("#modalConfirmacion").modal("show");
  }, 1500);
});


  // ===============================
  // Tooltips de Bootstrap
  // ===============================
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // ===============================
  // Toggle de precios mensual/anual
  // ===============================
  $("#togglePrecio").on("change", function () {
    const anual = this.checked;

    $(".precio").each(function () {
      const mensual = $(this).data("mensual");
      const anualValor = $(this).data("anual");
      $(this).text(anual ? `${anualValor}€/año` : `${mensual}€/mes`);
    });
  });

  // ===============================
  // Resaltar columna al hacer hover (tabla de precios)
  // ===============================
  $("#tablaPrecios td, #tablaPrecios th").hover(function () {
    const index = $(this).index();
    $("#tablaPrecios tr").each(function () {
      $(this).find("td, th").eq(index).addClass("bg-warning-subtle");
    });
  }, function () {
    const index = $(this).index();
    $("#tablaPrecios tr").each(function () {
      $(this).find("td, th").eq(index).removeClass("bg-warning-subtle");
    });
  });


  $('[data-filter]').on('click', function () {
    const filtro = $(this).data('filter');

    $('[data-filter]').removeClass('active').attr('aria-pressed', 'false');
    $(this).addClass('active').attr('aria-pressed', 'true');

    $('.blog-article').each(function () {
      const categoria = $(this).data('categoria');
      if (filtro === 'todos' || filtro === categoria) {
        $(this).fadeIn();
      } else {
        $(this).fadeOut();
      }
    });
  });

    // ===============================
  // Comentarios: destacar y responder
  // ===============================
  $(".btn-destacar").on("click", function () {
    const $comentario = $(this).closest(".comentario");
    $comentario.toggleClass("destacado");
  });

  $(".btn-responder").on("click", function () {
    const nombre = $(this).siblings(".comentario-nombre").text();
    const respuesta = prompt("Responder a " + nombre + ":");
    if (respuesta) {
      const $nueva = $(`
        <div class="comentario respuesta" tabindex="0">
          <p class="comentario-text"><strong>Respuesta a ${nombre}:</strong> ${respuesta}</p>
          <div class="comentario-footer">
            <span class="comentario-nombre">Tú</span>
          </div>
        </div>
      `);
      $(this).closest(".comentario").after($nueva.hide().fadeIn());
    }
  });

});