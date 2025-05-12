document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("No hay sesión iniciada.");
    window.location.href = "loginNS.html";
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const mascotaId = urlParams.get("id");

  fetch(`http://10.4.20.87:3000/mascota/${mascotaId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      if (!res.ok) throw new Error("No se encontró la mascota");
      return res.json();
    })
    .then(data => {
  document.getElementById("petPhoto").src = `http://10.4.20.87:3000/imagenesNS/${data.foto}`;
  document.getElementById("name").textContent = data.nombre;
  document.getElementById("race").textContent = data.razas?.name || "No disponible";
  document.getElementById("category").textContent = data.categorias?.nombre || "No disponible";
  document.getElementById("gender").textContent = data.generos?.nombre || "No disponible";
})
    .catch(err => {
      console.error(err);
      alert("Error al cargar datos de la mascota.");
    });
});
