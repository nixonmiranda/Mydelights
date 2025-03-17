// 🔹 Desplazamiento suave entre secciones
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// 🔹 Funcionalidad de Cotización Mejorada
document.getElementById("formCotizar").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita recargar la página

    let tipoCliente = document.getElementById("tipoCliente").value;
    let monto = parseFloat(document.getElementById("monto").value);
    let metodoPedido = document.getElementById("metodoPedido").value;
    let esCredito = document.getElementById("credito").checked;
    
    let descuento = 0;
    let mensajeCredito = "";
    
    if (isNaN(monto) || monto <= 0) {
        document.getElementById("resultado").textContent = "⚠️ Ingrese un monto válido.";
        return;
    }

    // 🔹 Aplicar descuentos según tipo de cliente y monto
    if (tipoCliente === "nuevo") {
        if (monto >= 250000) descuento = 0.02; // 2% si compra >= 250,000
    } else if (tipoCliente === "casual") {
        descuento = 0.02; // Siempre tiene 2%
        if (monto >= 200000) descuento += 0.04; // +4% si compra >= 200,000
    } else if (tipoCliente === "permanente") {
        descuento = 0.04; // Siempre tiene 4%
        if (monto >= 150000) descuento += 0.06; // +6% si compra >= 150,000
        if (esCredito) mensajeCredito = "💳 Cliente con crédito habilitado.";
    }

    let total = monto - (monto * descuento);

    // 🔹 Si el pedido es a domicilio, sumar el 2% adicional
    if (metodoPedido === "domicilio") {
        total += total * 0.02;
    }

    document.getElementById("resultado").innerHTML = `
        🧾 Tipo de Cliente: <strong>${tipoCliente.charAt(0).toUpperCase() + tipoCliente.slice(1)}</strong><br>
        💰 Monto Inicial: <strong>$${monto.toLocaleString()}</strong><br>
        📉 Descuento Aplicado: <strong>${(descuento * 100).toFixed(2)}%</strong><br>
        🚚 Método de Pedido: <strong>${metodoPedido === "domicilio" ? "Domicilio (+2%)" : "Presencial"}</strong><br>
        ✅ Total a Pagar: <strong>$${total.toLocaleString()}</strong><br>
        ${mensajeCredito}
    `;
});
document.getElementById('formContacto').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Capturar los datos del formulario
    let nombre = document.getElementById('nombreContacto').value;
    let email = document.getElementById('emailContacto').value;
    let mensaje = document.getElementById('mensajeContacto').value;
    
    // Validación simple
    if (nombre.trim() === "" || email.trim() === "" || mensaje.trim() === "") {
        document.getElementById('mensajeConfirmacion').innerHTML = "⚠️ Por favor, llena todos los campos.";
        return;
    }

    // Simular envío
    document.getElementById('mensajeConfirmacion').innerHTML = "✅ ¡Mensaje enviado! Nos pondremos en contacto contigo pronto.";
    
    // Limpiar el formulario
    document.getElementById('formContacto').reset();
});
