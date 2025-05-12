document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("No hay sesión iniciada.");
    window.location.href = "loginNS.html";
    return;
  }

  const response = await fetch("http://10.4.20.87:3000/mascota", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const mascotas = await response.json();

  // Agrupación por categoría
  const categorias = {};
  const estados = {};

  mascotas.forEach(m => {
    categorias[m.categoria_nombre] = (categorias[m.categoria_nombre] || 0) + 1;
    estados[m.estado] = (estados[m.estado] || 0) + 1;
  });

  // Gráfica por Categoría
  new Chart(document.getElementById("graficaCategorias"), {
    type: "bar",
    data: {
      labels: Object.keys(categorias),
      datasets: [{
        label: "Mascotas por Categoría",
        data: Object.values(categorias),
        backgroundColor: "#4e79a7",
      }],
    },
  });

  // Gráfica por Estado
  new Chart(document.getElementById("graficaEstados"), {
    type: "pie",
    data: {
      labels: Object.keys(estados),
      datasets: [{
        label: "Mascotas por Estado",
        data: Object.values(estados),
        backgroundColor: ["#59a14f", "#e15759"],
      }],
    },
  });

  // Guardamos para usar en PDF
  window.mascotasData = mascotas;
});

async function generarReporteDatos() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Reporte de Mascotas", 10, 10);

  const mascotas = window.mascotasData || [];
  let y = 20;

  mascotas.forEach((m, i) => {
    doc.setFontSize(10);
    doc.text(
      `${i + 1}. ${m.nombre} - ${m.categoria_nombre}, ${m.estado}`,
      10,
      y
    );
    y += 7;
    if (y > 270) {
      doc.addPage();
      y = 10;
    }
  });

  doc.save("reporte_mascotas_datos.pdf");
}

async function generarReporteGraficas() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const canvas1 = document.getElementById("graficaCategorias");
  const canvas2 = document.getElementById("graficaEstados");

  const img1 = canvas1.toDataURL("image/png", 1.0);
  const img2 = canvas2.toDataURL("image/png", 1.0);

  doc.setFontSize(16);
  doc.text("Gráficas de Mascotas", 10, 10);
  doc.addImage(img1, "PNG", 10, 20, 180, 80);
  doc.addPage();
  doc.addImage(img2, "PNG", 10, 20, 180, 80);

  doc.save("reporte_mascotas_graficas.pdf");
}
