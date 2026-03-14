FHIR.oauth2.ready()
  .then(async function (client) {
    const patient = await client.patient.read();

    const name =
      patient.name && patient.name.length
        ? `${(patient.name[0].given || []).join(" ")} ${patient.name[0].family || ""}`.trim()
        : "(no name)";

    const identifierValue =
      patient.identifier && patient.identifier.length
        ? patient.identifier[0].value
        : "(no identifier)";

    const allIdentifiers =
      patient.identifier && patient.identifier.length
        ? patient.identifier
            .map(id => `${id.system || "(no system)"}: ${id.value || "(no value)"}`)
            .join("<br>")
        : "(no identifiers)";

    document.getElementById("output").innerHTML = `
      <h3>Launch succeeded</h3>
      <h3>Version 2</h3>
      <p><b>Name:</b> ${name}</p>
      <p><b>DOB:</b> ${patient.birthDate || ""}</p>
      <p><b>Gender:</b> ${patient.gender || ""}</p>
      <p><b>Patient ID:</b> ${patient.id || ""}</p>
      <p><b>First Identifier:</b> ${identifierValue}</p>
      <p><b>All Identifiers:</b><br>${allIdentifiers}</p>
    `;
  })
  .catch(function (error) {
    console.error(error);
    document.getElementById("output").innerHTML =
      "<h3>SMART launch failed</h3><pre>" +
      (error && error.stack ? error.stack : JSON.stringify(error, null, 2)) +
      "</pre>";
  });
