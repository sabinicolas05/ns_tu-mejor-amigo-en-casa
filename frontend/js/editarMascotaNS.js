document.addEventListener("DOMContentLoaded", () => {
  const petForm = document.getElementById("petForm");
  const petPhoto = document.getElementById("petPhoto");
  const urlParams = new URLSearchParams(window.location.search);
  const mascotaId = urlParams.get("id");
  const token = localStorage.getItem("token");

  if (!token) {
    alert("No hay sesión iniciada.");
    window.location.href = "loginNS.html";
    return;
  }

  // 🔹 Función reutilizable para cargar selects
  function cargarOpciones(endpoint, selectId) {
    return fetch(`http://10.4.20.87:3000/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        const select = document.getElementById(selectId);
        select.innerHTML = `<option value="">Seleccione ${selectId}...</option>`;
        data.forEach(item => {
          const option = document.createElement("option");
          option.value = item.id;
          // Usa 'name' para raza, 'nombre' para el resto
          option.textContent = selectId === "race" ? item.name : item.nombre;
          select.appendChild(option);
        });
      })
      .catch(err => {
        console.error(`Error cargando ${endpoint}:`, err);
        alert(`No se pudo cargar el campo ${selectId}`);
      });
  }

  // 🔸 Primero, cargamos todos los selects
  Promise.all([
    cargarOpciones("raza", "race"),
    cargarOpciones("categoria", "category"),
    cargarOpciones("genero", "gender"),
    cargarOpciones("usuario", "usuario"),
  ])
  .then(() => {
    // 🔸 Luego, cargamos los datos de la mascota
    return fetch(`http://10.4.20.87:3000/mascota/${mascotaId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("petId").value = data.id;
    document.getElementById("name").value = data.nombre;
    document.getElementById("race").value = data.raza_id;
    document.getElementById("category").value = data.categoria_id;
    document.getElementById("gender").value = data.genero_id;
    document.getElementById("usuario").value = data.usuario_id;
    document.getElementById("estado").value = data.estado;

    // Mostrar la foto actual
    petPhoto.src = `http://10.4.20.87:3000/imagenesNS/${data.foto}`;
  })
  .catch((err) => {
    console.error("Error al cargar datos de la mascota:", err);
    alert("No se pudo cargar la información de la mascota.");
  });

  // 🔸 Manejar envío del formulario
  petForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", document.getElementById("name").value);
    formData.append("raza_id", document.getElementById("race").value);
    formData.append("categoria_id", document.getElementById("category").value);
    formData.append("genero_id", document.getElementById("gender").value);
    formData.append("usuario_id", document.getElementById("usuario").value);
    formData.append("estado", document.getElementById("estado").value);

    const fileInput = document.getElementById("photo");
    if (fileInput.files.length > 0) {
      formData.append("photo", fileInput.files[0]);
    }

    fetch(`http://10.4.20.87:3000/mascota/${mascotaId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then(res => {
        if (!res.ok) throw new Error("Error al actualizar la mascota.");
        return res.json();
      })
      .then(() => {
        alert("Mascota actualizada correctamente.");
        window.location.href = "listarMascotasNS.html";
      })
      .catch((err) => {
        console.error("Error al actualizar:", err);
        alert("No se pudo actualizar la mascota.");
      });
  });
});
