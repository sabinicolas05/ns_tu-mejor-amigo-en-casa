const API_URL = "http://10.4.20.87:3000";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { "Authorization": `Bearer ${token}` } : {};
}

function fillSelect(selectId, data, label = "nombre") {
  const select = document.getElementById(selectId);
  if (!select) return console.error(`Elemento con ID ${selectId} no encontrado`);

  select.innerHTML = '<option value="">Seleccione...</option>';
  data.forEach(item => {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = item[label] || `Sin ${label}`;
    select.appendChild(option);
  });
}

async function loadSelectData() {
  try {
    const [races, categories, genders, users] = await Promise.all([
      fetch(`${API_URL}/raza`, { headers: getAuthHeaders() }).then(r => r.json()),
      fetch(`${API_URL}/categoria`, { headers: getAuthHeaders() }).then(r => r.json()),
      fetch(`${API_URL}/genero`, { headers: getAuthHeaders() }).then(r => r.json()),
      fetch(`${API_URL}/usuario`, { headers: getAuthHeaders() }).then(r => r.json()),
    ]);

    fillSelect("race", races, "name");      // Asegúrate que en la DB el campo se llama "nombre"
    fillSelect("category", categories, "nombre");
    fillSelect("gender", genders, "nombre");
    fillSelect("usuario", users, "nombre");
  } catch (error) {
    console.error("Error al cargar selects:", error);
    alert("No se pudieron cargar los datos.");
  }
}

function setupFormHandler() {
  const form = document.getElementById("petForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const elements = {
      name: document.getElementById("name"),
      race: document.getElementById("race"),
      category: document.getElementById("category"),
      gender: document.getElementById("gender"),
      usuario: document.getElementById("usuario"),
      estado: document.getElementById("estado"),
      photo: document.getElementById("photo")
    };

    for (const key in elements) {
      if (!elements[key]) {
        alert(`Falta el campo ${key}`);
        return;
      }
    }

    if (!elements.name.value || !elements.estado.value) {
      alert("Nombre y estado son obligatorios.");
      return;
    }

    const formData = new FormData();
    formData.append("nombre", elements.name.value);
    formData.append("raza_id", elements.race.value);
    formData.append("categoria_id", elements.category.value);
    formData.append("genero_id", elements.gender.value);
    formData.append("usuario_id", elements.usuario.value);
    formData.append("estado", elements.estado.value);
    
    // ✅ CAMBIADO: ahora se usa "photo" (como espera multer)
    if (elements.photo.files[0]) formData.append("photo", elements.photo.files[0]);

    try {
      // ✅ CAMBIADO: ruta corregida a /mascota
      const res = await fetch(`${API_URL}/mascota`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: formData
      });

      if (!res.ok) throw new Error("Error al registrar la mascota");
      alert("Mascota registrada correctamente");
      window.location.href = "listarMascotasNS.html";
    } catch (err) {
      console.error("Error:", err);
      alert("Error al registrar la mascota");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadSelectData();
  setupFormHandler();
});
