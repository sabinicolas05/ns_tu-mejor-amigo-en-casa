const API_URL = "http://localhost:3000";

function getAuthHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`
  };
}

async function loadPets() {
  try {
    const res = await fetch(`${API_URL}/mascota`, {
      headers: getAuthHeaders()
    });

    if (!res.ok) throw new Error("Error al cargar mascotas");

    const pets = await res.json();
    const container = document.getElementById("petList");
    container.innerHTML = "";

    pets.forEach(pet => {
      const card = document.createElement("div");
      card.className = "pet-card";

      card.innerHTML = `
        <div class="pet-info">
          <img class="pet-photo" src="${pet.foto ? `${API_URL}/imagenesNS/${pet.foto}` : `${API_URL}/imagenesNS/default-pet.png`}" alt="Foto de mascota">
          <div>
            <h1 class="pet-name">${pet.nombre || 'Sin nombre'}</h1>
            <p class="pet-race">${pet.razas?.name || 'Sin raza'}</p>
          </div>
        </div>
        <div class="pet-actions">
          <img src="img/btn-show.svg" alt="Ver" title="Ver" class="view-btn" data-id="${pet.id}">
          <img src="img/btn-edit.svg" alt="Editar" title="Editar" class="edit-btn" data-id="${pet.id}">
          <img src="img/btn-delete.svg" alt="Eliminar" title="Eliminar" class="delete-btn" data-id="${pet.id}">
        </div>
      `;

      container.appendChild(card);
    });

    // Botón Editar
    document.querySelectorAll(".edit-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const petId = e.target.getAttribute("data-id");
        window.location.href = `editarMascotasNS.html?id=${petId}`;
      });
    });

    // Botón Ver
    document.querySelectorAll(".view-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const petId = e.target.getAttribute("data-id");
        window.location.href = `consultarMascotaNS.html?id=${petId}`;
      });
    });

    // Botón Eliminar
    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", async (e) => {
        const petId = e.target.getAttribute("data-id");

        const confirmDelete = confirm("¿Estás seguro que deseas eliminar esta mascota?");
        if (!confirmDelete) return;

        try {
          const res = await fetch(`${API_URL}/mascota/${petId}`, {
            method: "DELETE",
            headers: getAuthHeaders()
          });

          if (!res.ok) throw new Error("Error al eliminar");

          alert("Mascota eliminada correctamente");
          loadPets(); // Recargar lista

        } catch (err) {
          console.error("Error al eliminar mascota:", err);
          alert("No se pudo eliminar la mascota");
        }
      });
    });

  } catch (error) {
    console.error("Error al cargar mascotas:", error);
    alert("Error al cargar la lista de mascotas");
  }
}

document.addEventListener("DOMContentLoaded", loadPets);
