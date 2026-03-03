/*
    MENÚ LATERAL
*/
const sideMenu = document.querySelector("#sideMenu");
const toggleBtn = document.querySelector(".open-menu");
const header = document.querySelector(".site-header");

    if (toggleBtn && sideMenu){
      toggleBtn.addEventListener("click", () => {
      sideMenu.classList.toggle("active");
      toggleBtn.classList.toggle("active");

      toggleBtn.textContent =
      sideMenu.classList.contains("active") ? "✖" : "☰";
      });
    }

    let lastScroll = 0; 

/*
    MENÚ SUPERIOR (SCROLL)
*/
    if (header){
        window.addEventListener("scroll", () => {
        const currentScroll = window.scrollY;

        if (currentScroll > lastScroll && currentScroll > 50) {
        // Scroll hacia abajo -> ocultar
        header.classList.add("hide");
        } else {
        // Scroll hacia arriba -> mostrar
        header.classList.remove("hide");
        }

        lastScroll = currentScroll;
        });
    }

/*
    FORMULARIO
*/
        const formulario = document.querySelector("#formulario");
        const mensajes = document.querySelector("#mensajes");

        if (formulario){
            formulario.addEventListener("submit",function(event){
            event.preventDefault();

            const nameValue = document.querySelector("#nombre").value.trim();
            const surnameValue = document.querySelector("#apellidos").value.trim();
            const emailValue = document.querySelector("#email").value.trim();
            const passwordValue = document.querySelector("#password").value;
            const password2Value = document.querySelector("#password2").value;
            const checkConditions = document.querySelector("#condiciones").checked; 
            const errTimer = 2000;

            let errores = [];

            mensajes.innerHTML = "";
            mensajes.className = "mensajes";

            if (nameValue.length < 3){
                errores.push("Nombre inválido, debe tener al menos tres caracteres.")
            };

            if (surnameValue.length < 3){
                errores.push("Apellidos inválidos, deben tener al menos 3 caracteres.")
            };

            if (emailValue.indexOf("@") === -1 || emailValue.indexOf(".")===-1 || emailValue.lastIndexOf(".")< emailValue.indexOf("@")){ //si el @ no está, o no está el . o si el . esta antes del @, da error
                errores.push("Email inválido, por favor, utiliza \"@.\" adecuadamente.")
            }

            if (passwordValue.length < 6){
                errores.push("La contraseña debe tener al menos 6 caracteres.")
            };

            if (passwordValue !== password2Value){
                errores.push("Las contraseñas tienen que ser iguales.")
            };

            if (!checkConditions){
                errores.push("Debes aceptar las condiciones.")
            };

            if (errores.length > 0){
                mensajes.className = "mensajes err";
                mensajes.innerHTML = errores.join("<br>");
                setTimeout (()=>{
                    mensajes.innerHTML="";
                    mensajes.className="mensajes";
            },errTimer);
            }else {
                mensajes.className = "mensajes ok";
            };

            });
        }